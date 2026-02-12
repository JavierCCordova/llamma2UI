export const clientService ={
    
    async getClient(){

        const token =   localStorage.getItem('token')
        
        console.log(token);

        if(!token){
            throw new Error("No auth token")
        }

        const requestOptions = {
            method: "GET",
            headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

        const res = await fetch("http://localhost:8000/crm/getclient", requestOptions)

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
    },
     
    async getRecords(idRecord :string){
        const token =   localStorage.getItem('token')
        if(!token){
            throw new Error("No auth token")
        }

        const requestOptions ={
            method: 'GET',
            headers:{
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                    } 
            }
        const res = await fetch(`http://localhost:8000/crm/getRecord?idRecord=${idRecord}`,requestOptions)
        if(!res.ok){
                throw new Error(" Problemas obtener Client");
        }
        const result =  await res.json();
        return result.Data
    },


    async insertRecord(record: any){
        const token =   localStorage.getItem('token')
        if(!token){
            throw new Error("No auth token")
        }
        const requestOptions = {
            method: 'PUT',
            headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                        },
            body :  JSON.stringify(record)
            }
        const res = await fetch('http://localhost:8000/crm/SaveRecord',requestOptions)
        if (!res.ok){
            throw new Error("Problemas a guardar");
        }
        const response = await res.json()
        return response
    },

    async updateRecord(record: any, id: string){
        const token =   localStorage.getItem('token')
        if(!token){
            throw new Error("No auth token")
        }
        const requestOptions = {
            method: 'PATCH',
            headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                        },
            body :  JSON.stringify(record)
            }
        const res = await fetch(`http://localhost:8000/crm/UpdateRecord?id=${id}`,requestOptions)
        if (!res.ok){
            throw new Error("Problemas a guardar");
        }
        const response = await res.json()
        return response
    },

    async deleteRecord(id: string){    
        const token =   localStorage.getItem('token')
        if(!token){
            throw new Error("Noauth token")
        }
        
        const resquestOption ={
            method :   'Delete',
            headers : { 
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            } 
        }
        const res = await fetch(`http://localhost:8000/crm/DeleteRecord?id=${id}`, resquestOption)
        if(!res.ok){
            throw new Error("Problemas al eliminar");
        }
        const response = await res.json()
        return response
    }   
}  