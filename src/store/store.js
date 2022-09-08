import { reactive } from "vue";

export let store = reactive({
    users: [
        {
            name: `Hugo Lindfors`,
            score: -1,
            languages: [
                {
                    name: `Swedish`,
                    level: `Native`
                },
                {
                    name: `English`,
                    level: `Advanced`
                },
                {
                    name: `Finnish`,
                    level: `Intermediate`
                },
                {
                    name: `German`,
                    level: `Intermediate`
                },
            ]
        },
        {
            name: `Sebastian Jensen`,
            score: 2,
            languages: [
                {
                    name: `Swedish`,
                    level: `Native`
                },
                {
                    name: `English`,
                    level: `Advanced`
                },
                {
                    name: `Japanese`,
                    level: `Intermediate`
                },
                {
                    name: `German`,
                    level: `Beginner`
                },
            ]
        },
        {
            name: `Adam Bertilsson`,
            score: 4,
            languages: [
                {
                    name: `Swedish`,
                    level: `Native`
                },
                {
                    name: `English`,
                    level: `Advanced`
                },
            ]
        },
        {
            name: `Bertil Cesarsson`,
            score: 1,
            languages: [
                {
                    name: `Swedish`,
                    level: `Native`
                },
                {
                    name: `English`,
                    level: `Advanced`
                },
            ]
        },
        {
            name: `Cesar Davidsson`,
            score: 1,
            languages: [
                {
                    name: `Swedish`,
                    level: `Native`
                },
                {
                    name: `English`,
                    level: `Advanced`
                },
            ]
        },
        {
            name: `David Eriksson`,
            score: 7,
            languages: [
                {
                    name: `Swedish`,
                    level: `Native`
                },
                {
                    name: `English`,
                    level: `Advanced`
                },
            ]
        },
        {
            name: `Erik Filipsson`,
            score: 6,
            languages: [
                {
                    name: `Swedish`,
                    level: `Native`
                },
                {
                    name: `English`,
                    level: `Advanced`
                },
            ]
        },
        {
            name: `Filip Gustavsson`,
            score: 6,
            languages: [
                {
                    name: `Swedish`,
                    level: `Native`
                },
                {
                    name: `English`,
                    level: `Advanced`
                },
            ]
        },
        {
            name: `Gustav Helgesson`,
            score: -6,
            languages: [
                {
                    name: `Swedish`,
                    level: `Native`
                },
                {
                    name: `English`,
                    level: `Advanced`
                },
            ]
        },
    ]
})