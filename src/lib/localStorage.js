export function persist(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function load(key) {
    const value = localStorage.getItem(key)
    if (value) {
        return JSON.parse(value)
    }
}