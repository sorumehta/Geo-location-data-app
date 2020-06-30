export default class User {

    static async signup(username, password) {
        data = {
            username,
            password
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const res = await fetch('/user/signup', options);
        const json = await res.json();
        console.log(json);
        if (res.status == 201) {
            window.location.replace("/signin.html");
        } else {
            alert(json);
        }
        return res.status;
    }

    static async login(username, password) {
        const data = {
            username,
            password
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const res = await fetch('/user/signin', options);
        const json = await res.json();
        console.log("status: ", res.status)
        if (res.status === 200) {
            
            window.localStorage.setItem("access_token", json.token);
            //window.location.replace(json.url);
            
            
        }
        else{
            alert(json);
        }
        return res.status;

    }

    static logout() {
        window.localStorage.clear();
        window.location.replace('/');
    }
}