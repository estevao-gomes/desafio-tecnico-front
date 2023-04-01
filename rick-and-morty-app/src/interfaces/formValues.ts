export interface formValues{
    name: string,
    status: {
        alive: boolean,
        dead: boolean,
        unknown: boolean
    },
    gender: { male: boolean, female: boolean, genderless: boolean, unknown: boolean}
}