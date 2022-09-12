export const add = "ADD"
export const addmore = "ADD-MORE"
export const removesome = "REMOVE-SOME"


export const addToCart = (item) => {
    return {
        type: add,
        payload: item
    }
}

export const addMore = (item) => {
    return {
        type: addmore,
        payload: item
    }
}

export const removeSome = (item) => {
    return {
        type: removesome,
        payload: item
    }
}