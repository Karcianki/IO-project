###Module consumers adds websockets to application"""
import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from karcianki.models import Game, Player

class KarciankiConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        # self.room_name = self.scope['url_route'\]['kwargs']['room_code']
        # self.room_group_name = 'room_%s' % self.room_name
        self.game_id = self.scope['url_route']['kwargs']['game_id']
        self.game_name = 'game_%s' % self.game_id

        # Join room group
        await self.channel_layer.group_add(
            # self.room_group_name,
            self.game_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        print("Disconnected")
        # Leave room group
        await self.channel_layer.group_discard(
            # self.room_group_name,
            self.game_name,
            self.channel_name
        )

    async def receive(self, text_data):
        """
        Receive message from WebSocket.
        Get the event and send the appropriate event
        """
        response = json.loads(text_data)
        event = response.get("event", None)
        message = response.get("message", None)
        data = json.parse(message)
        if event == 'JOIN':
            # Send message to room group
            # await self.channel_layer.group_send(self.room_group_name, {
            await self.channel_layer.group_send(self.game_name, {
                'type': 'send_message',
                'message': message,
                "event": "JOIN"
            })
        elif event == 'QUIT':
            # Send message to room group
            # await self.channel_layer.group_send(self.room_group_name, {
            await self.channel_layer.group_send(self.game_name, {
                'type': 'send_message',
                'message': message,
                "event": "QUIT"
            })
        elif event == 'TURN':
            # Send message to room group
            # await self.channel_layer.group_send(self.room_group_name, {
            await self.channel_layer.group_send(self.game_name, {
                'type': 'send_message',
                'message': message,
                "event": "TURN"
            })
        elif event == 'START':
            game = Game.objects.get(game_id=self.game_id)
            player_count = Player.objects.filter(game=game).count()

            dealer = game.dealer
            player1 = Player.objects.get(game=game, player_number=(dealer + 1) % player_count)
            player2 = Player.objects.get(game=game, player_number=(dealer + 2) % player_count)

            bet1 = int(game.start_chips / 20)
            bet2 = int(game.start_chips / 10)

            player1.chips -= bet1
            player1.last_bet = bet1

            player2.chips -= bet2
            player2.last_bet = bet2

            game.pot += int(game.start_chips * 3 / 20)
            game.last_raise = (dealer + 2) % player_count

            player1.save(), player2.save(), game.save()

            json_data = json.dumps({
                "player_number": f"${(dealer + 3) % player_count}",
                "last_bet": f"${bet2}"
            })

            await self.channel_layer.group_send(self.game_name, {
                "type": "send_message",
                "event": "TURN",
                "message": json_data
            })

        elif event == 'END':
            game = Game.objects.get(game_id=self.game_id)

            winning_player = Player.objects.get(game = game, player_number=data.winner_number)
            winning_player.chips += game.pot
            winning_player.save()

            Player.objects.filter(game = game, chips=0).delete()
            player_count = Player.objects.filter(game=game).count()
            
            game.stage  = 1
            game.pot    = 0
            game.dealer = (game.dealer + 1) % player_count
            game.save()

            json_data = json.dumps({
                "winner_number": f"${data.winner_number}"
            })

            await self.channel_layer.group_send(self.game_name, {
                "type": "send_message",
                "event": "START",
                "message": json_data
            })


        elif event == 'NEXT':
            game = Game.objects.get(game_id=self.game_id)
            game.stage += 1
            game.save()

            player_count = Player.objects.filter(game=game).count()

            json_data = json.dumps({
                "player_number": f"${(game.last_raise + 1) % player_count}",
                "last_bet": "0"
            })

            await self.channel_layer.group_send(self.game_name, {
                "type": "send_message",
                "event": "TURN",
                "message": json_data
            })

    async def send_message(self, res):
        """ Receive message from room group """
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            "payload": res,
        }))