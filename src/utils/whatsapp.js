export function envioWhatsapp(mensaje) {

    const body = {
        "number": "573188480490",
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