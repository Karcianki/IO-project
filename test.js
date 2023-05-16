fetch(`${process.env.DATABASE_URL}/api/karcianki/create/`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        nickname: "test",
        chips: 100
    }),
})