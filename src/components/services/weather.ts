const baseUrl = "http://api.weatherapi.com/v1/current.json?key="
const API_KEY = "a15173e60fe1436c877212517242503"
export default async function getLocation(cityName: string) {
    const response = await fetch(`${baseUrl}${API_KEY}&q=${cityName}&aqi=no`)
    if (!response.ok) {
        throw await response.json()
    }
    return await response.json();
}