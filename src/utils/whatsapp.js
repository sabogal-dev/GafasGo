export function envioWhatsapp(mensaje) {
    const body = {
        "number": "120363372728056229@g.us",
        "message": mensaje
    }
    try {
        fetch("https://sabogal.top/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
        )
    }
    catch {
        console.log("error al enviar")
    }
}