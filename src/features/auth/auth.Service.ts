
export const authService = {
    async login(
        data: {
            user: string;
            password: string
        }
    ){  
        const formData  =   new FormData();
        formData.append('username', data.user);
        formData.append('password', data.password);

        const requestOptions  =   {
            method : "POST",
            body: formData,
            //redirect: "follow",
            //headers: { 'content-type': 'application/json' }
        }
        
        const res = await fetch("http://localhost:8000/auth/login", requestOptions)
        
        if(!res.ok){    
            throw new Error("Login Error");
        }
        const result = await res.json();
        console.log(result);

        return result // acceso
 
    }
}