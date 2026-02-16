export const agentService = {


    async setCalendar(calendar: any){
        const token = localStorage.getItem("token")
        if(!token){
            throw new Error("No auth token")
        }

        const requestOptions = {
            method : "PUT",
            headers: {
                 'Accept': 'application/json',
                 "Content-Type": "application/json", 
                 'Authorization': `Bearer ${token}`
            },
            body : JSON.stringify(calendar)
        }
        const res = await fetch('http://localhost:8000/crm/setCalendar',requestOptions)
        if(res.ok!){
             throw new Error("Problemas a guardar");
        }
        const response    =   await res.json()

        return response
    },

    async getAgentPrograming(){

        const token =   localStorage.getItem("token")

        if(!token){
            throw new Error("No auth token")
        }

        const requestOptions    =   {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await fetch("http://localhost:8000/crm/getCalendar", requestOptions)
        if(res.status == 401){
                localStorage.removeItem("token")
                window.location.href    =   "/login?message=expired";
                return;
        }
       
        if(!res.ok){
                throw new Error(" Problemas obtener Client");
                }
        const result    =   await res.json();
        console.log(result);
        return result

    }

}