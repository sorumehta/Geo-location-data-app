export default class Mood {

    static async add(mood, reason){
        const data = {
            mood,
            reason
        };

        const bearer = 'Bearer ' + window.localStorage.getItem('access_token');
        const options = {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'authorization': bearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const res = await fetch('/mood', options);
        const json = await res.json();
        console.log(json);
        return res.status;
    }

    static async getAll(){
        const bearer = 'Bearer ' + window.localStorage.getItem('access_token');
        const options = {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'authorization': bearer,
                    'Content-Type': 'application/json'
                }
            }
        
        const response = await fetch('/mood', options);
        if (response.status==200){
            const data = await response.json();
            return data;
        }
        return null
    }
        /*data.forEach(item => 
            {
                console.log("Adding data to list");
                const root = document.createElement('div');
                const mood = document.createElement('div')
                mood.textContent = `Mood: ${item.mood}`;
                const geo = document.createElement('div');
                geo.textContent = `Reason: ${item.reason}`;
                const date = document.createElement('div');
                const dateString = new Date(item.timestamp).toLocaleString();
                date.textContent = dateString;
                const br = document.createElement("BR");
                root.append(mood,geo,date,br);
                this.appendChild(root);
            });*/
    
}
