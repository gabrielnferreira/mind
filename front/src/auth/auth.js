export const isAuthenticated = () => {
    if(sessionStorage.getItem('app-token')) return true
    else return false
} 
