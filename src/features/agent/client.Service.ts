export const agentService = {

    async getAgentPrograming(){

        const token =   localStorage.getItem("token")

        if(!token){
            throw new Error("No auth token")
        }

        const requestOptions    =   {
            method: "GET",
            headers: {
                'Accep': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        //const res = await fetch("http://localhost:8000/crm/getAgent", requestOptions)
        //if(res.status == 401){
        //        localStorage.removeItem("token")
        //        window.location.href    =   "/login?message=expired";
        //        return;
        //}
        const res = {
                    status: 200,
                    ok: true,
                    json: async () => ({
                        status: 200,
                        data: [
                            { date: '2026-02-01', descripcion: 'holamundo', cliente: 'AB' },
                            { date: '2026-02-02', descripcion: 'segunda prueba', cliente: 'CD' }
                        ]
                    })
                }
        
        if(!res.ok){
                throw new Error(" Problemas obtener Client");
                }
        const result    =   await res.json();
        console.log(result);
        return result

    }

}