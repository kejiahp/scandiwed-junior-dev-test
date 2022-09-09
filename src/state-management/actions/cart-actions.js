export const addToCart = (item) => {
    return {
        type: 'ADD',
        payload: item
    }
}

export const removeFromCart = () => {
    return {
        type: 'REMOVE'
    }
}

export const addMore = (item) => {
    return {
        type: 'ADD-MORE',
        payload: item
    }
}

export const removeSome = (item) => {
    return {
        type: 'REMOVE-SOME',
        payload: item
    }
}