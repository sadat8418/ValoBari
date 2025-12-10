import conf from "../conf/conf.js";
export class PropertyService {
    backendUrl = conf.appwriteUrl;

    async getAll() {
        const res = await fetch(`${this.backendUrl}/properties`);
        return await res.json();
    }

    async getOne(id) {
        const res = await fetch(`${this.backendUrl}/properties/${id}`);
        return await res.json();
    }

    async createProperty(data) {
        const token = localStorage.getItem("token");

        const res = await fetch(`${this.backendUrl}/properties`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        return await res.json();
    }

    async updateProperty(id, data) {
        const token = localStorage.getItem("token");

        const res = await fetch(`${this.backendUrl}/properties/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        return await res.json();
    }

    async deleteProperty(id) {
        const token = localStorage.getItem("token");

        const res = await fetch(`${this.backendUrl}/properties/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return await res.json();
    }
}

export default new PropertyService();
