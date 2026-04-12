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

    }


}