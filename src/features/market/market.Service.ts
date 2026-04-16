export const marketService = {

    async setMarketConsult(file: File){

        const token =localStorage.getItem('token')
        if(!token){
            throw new Error("No auth token")
        }

        const formData =    new FormData();
        formData.append("file",file)

        const requestOptions  = {

            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        }

        const res = await fetch('http://localhost:8000/Robot/robot/ocrMercado', requestOptions )
        if(!res.ok){
            throw new Error("Problemas al obtener")
        }

        const response =    await res.json()
        return response

    },


    async setMarketSave(market: any){

        const token  = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')

        market.usuario_id = userId;

        if(!token){
            throw new Error("No auth token")
        }

        const requestOptions = {
            method : "POST",
            headers: {
                 'Accept': 'application/json',
                 "Content-Type": "application/json", 
                 'Authorization': `Bearer ${token}`
            },
            body : JSON.stringify(market)
        }

        const res   =   await fetch('http://localhost:8000/Robot/robot/ocrMercadoSave',requestOptions)
        if(!res.ok){
            throw new Error("Problemas a guardar");
        }
        const response  =   await res.json()
        return response
    }


}