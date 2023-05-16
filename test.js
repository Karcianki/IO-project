fetch(`http://localhost:8000/api/karcianki/create/`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        nickname: "test",
        chips: 100
    }),
})