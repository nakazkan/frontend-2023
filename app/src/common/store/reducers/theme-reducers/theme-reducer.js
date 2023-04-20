import { initialState } from '../../model/initialState'
import { ActionTypes, ThemeTypes } from '../../constants'

export const themeReducer = (state = initialState(), action) => {
    switch (action.type) {
        case ActionTypes.changeTheme: {
            const newTheme = state.theme === ThemeTypes.blue
                ? ThemeTypes.light
                : ThemeTypes.blue

            return {
                ...state,
                theme: newTheme,
            }
        }
        default: {
            return state
        }
    }
}