const perfiles = [
    { user: "JORGE", value: "1", IDgrupo: "120363372728056229@g.us" },
    { user: "YESID", value: "2", IDgrupo: "120363372728056229@g.us" },
    { user: "SANTIAGO", value: "3", IDgrupo: "573184191175-1602193495@g.us" },
    { user: "ADMIN", value: "4", IDgrupo: "120363372728056229@g.us" }
]

export function envioWhatsapp(mensaje) {

    const user = localStorage.getItem("user");
    const grupoWhatsapp = perfiles.findIndex((perfil)=>{return perfil.value == user})


    const body = {
        "number": perfiles[grupoWhatsapp].IDgrupo,
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