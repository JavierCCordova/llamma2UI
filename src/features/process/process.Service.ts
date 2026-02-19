export const processService = {

    async getDniRobot(dni: number){

        const token =   localStorage.getItem("token")
        if(!token){
            throw new Error("No auth token")
        }

        const requestOptions    =   {
            method: 'POST',
            headers : {
                 'Accept': 'application/json',
                 "Content-Type": "application/json", 
                 'Authorization': `Bearer ${token}`
            }
        }

        const res   =   await fetch(`http://localhost:8000/Robot/robot/dni?dni=${dni}`, requestOptions)

        if(!res.ok){
             throw new Error(`Problemas {$res}`);
        }
        const response  =   await res.json()

        return response.data as string
    }

}