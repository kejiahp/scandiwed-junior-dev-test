export const all = "ALL"
export const clothes = "CLOTHES"
export const tech = "TECH"
export const openSele = 'OPEN-SELECTOR'
export const closeSele = 'CLOSE-SELECTOR'

export const allCategory = () => {
    return {
        type: all
    }
}

export const clothesCategory = () => {
    return {
        type: clothes
    }
}

export const techCategory = () => {
    return {
        type: tech
    }
}

export const openSelector = (id) => {
    return{
        type: openSele,
        payload: {id}
    }
}

export const closeSelector = () => {
    return{
        type: closeSele
    }
}