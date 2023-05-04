###Module consumers adds websockets to application"""
import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer

class KarciankiConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        # self.room_name = self.scope['url_route'\]['kwargs']['room_code']
        # self.room_group_name = 'room_%s' % self.room_name
        self.game_id = self.scope['session']['game_id']
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
        if event == 'JOIN':
            # Send message to room group
            # await self.channel_layer.group_send(self.room_group_name, {
            await self.channel_layer.group_send(self.game_name, {
                'type': 'send_message',
                'message': message,
                "event": "JOIN"
            })

    async def send_message(self, res):
        """ Receive message from room group """
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            "payload": res,
        }))