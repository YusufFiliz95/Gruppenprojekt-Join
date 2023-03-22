/* @ Christoph - wie lösen wir das mit der category-color, einfach mit einem RGB Code/ Hexcode ?? Wär glaub ich am einfachsten 
    danach mit classList arbeiten - 
    @ Yusuf dasselbe bei den contacts oder?*/


let tasks = [
    {
        "id": 0,
        "title": "Einkaufen",
        "discription": "Ich muss heute noch einkaufen",
        "category": "Lebensmittel",
        "category-color": "#000000",
        "contacts": [
            {
                "name": "Tobias",
                "surname": "Ruhmanseder",
                "initials": "TR",
                "color": "#7AE229"
            }
        ],
        "date": "2023-03-15",
        "prio": 2,  /* 1 = Urgent  2 = Medium  3= Low - please put this text to the function witch prio uses */
        "subtasks": ['Banane', 'Apfel', 'Limo', 'Kaffee', 'Pizza'],
        "subtasks-value": [1, 1, 1, 1, 0],
        "status": "toDo"
    },
    {
        "id": 1,
        "title": "Wäsche waschen",
        "discription": "Die Waschmaschine und der Trockner müssen heute noch glühen. Achtung bei der Temperatur-Einstellung nicht das die Hose nicht mehr passt :D",
        "category": "Hausarbeit",
        "category-color": "#3983AB",
        "contacts": [
            {
                "name": "Tobias",
                "surname": "Ruhmanseder",
                "initials": "TR",
                "color": "#7AE229"
            },
            {
                "name": "Tobias",
                "surname": "Ruhmanseder",
                "initials": "TR",
                "color": "#7AE229"
            },
            {
                "name": "Tobias",
                "surname": "Ruhmanseder",
                "initials": "TR",
                "color": "#1AE350"
            },
            {
                "name": "Tobias",
                "surname": "Ruhmanseder",
                "initials": "TR",
                "color": "#7AE229"
            },
            {
                "name": "Tobias",
                "surname": "Ruhmanseder",
                "initials": "TR",
                "color": "#7AE229"
            },

        ],
        "date": "2023-03-16",
        "prio": 2,  /* 1 = Urgent  2 = Medium  3= Low - please put this text to the function witch prio uses */
        "subtasks": ["Wäsche in die Waschmaschine", "Wäsche in den Trockner", "Wäsche zusammenlegen"],
        "subtasks-value": [0, 1, 0],
        "status": "toProgress"
    },
    {
        "id": 2,
        "title": "Meeting",
        "discription": "Keine Ahnung",
        "category": "Arbeit",
        "category-color": "#DFAC1F",
        "contacts": [
            {
                "name": "Tobias",
                "surname": "Ruhmanseder",
                "initials": "TR",
                "color": "#7AE229"
            }
        ],
        "date": "2023-03-01",
        "prio": 3,
        "subtasks": [],
        "subtasks-value": [],
        "status": "awaitingFeedback"
    },
    {
        "id": 3,
        "title": "Coding",
        "discription": "Übe in der Developer Akademie noch ein bisschen besser",
        "category": "Weiterbildung",
        "category-color": "#1EB8D7",
        "contacts": [
            {
                "name": "Max",
                "surname": "Mustermann",
                "initials": "MM",
                "color": "#47965F"
            }
        ],
        "date": "2023-02-05",
        "prio": 1,
        "subtasks": [],
        "subtasks-value": [],
        "status": "done"
    },
    {
        "id": 4,
        "title": "Rasenmähen",
        "discription": "Im Garten gehört der Rasen noch gemäht!",
        "category": "Hausarbeit",
        "category-color": "#3983AB",
        "contacts": [
            {
                "name": "Denise",
                "surname": "Ruhmanseder",
                "initials": "DR",
                "color": "#EEF31A"
            },
            {
                "name": "Tobias",
                "surname": "Ruhmanseder",
                "initials": "TR",
                "color": "#7AE229"
            }
        ],
        "date": "2023-02-15",
        "prio": 3,
        "subtasks": ['Unkraut zupfen', 'Rasenmähen'],
        "subtasks-value": [0, 0],
        "status": "toProgress"
    },
    {
        "id": 5,
        "title": "zum Sport gehen",
        "discription": "Sport ist gesund",
        "category": "Freizeit",
        "category-color": "#0063C0",
        "contacts": [
            {
                "name": "Denise",
                "surname": "Ruhmanseder",
                "initials": "DR",
                "color": "#EEF31A"
            }
        ],
        "date": "2023-05-10",
        "prio": 2,
        "subtasks": [],
        "subtasks-value": [],
        "status": "awaitingFeedback"
    },
    {
        "id": 6,
        "title": "Kochen",
        "discription": "Ich muss heute noch was gutes Kochen",
        "category": "Lebensmittel",
        "category-color": "#000000",
        "contacts": [
            {
                "name": "Mama",
                "surname": "Ruhmanseder",
                "initials": "MR",
                "color": "#DC3A63"
            }
        ],
        "date": "2023-01-01",
        "prio": 3,  /* 1 = Urgent  2 = Medium  3= Low - please put this text to the function witch prio uses */
        "subtasks": ['Banane', 'Apfel', 'Limo', 'Kaffee', 'Pizza'],
        "subtasks-value": [0, 0, 0, 0, 0],
        "status": "awaitingFeedback"
    },
    {
        "id": 7,
        "title": "Nothing",
        "discription": "Do Nothing",
        "category": "Anything",
        "category-color": "#008000",
        "contacts": [
            {
                "name": "Tobias",
                "surname": "Ruhmanseder",
                "initials": "TR",
                "color": "#7AE229"
            }
        ],
        "date": "2023-01-21",
        "prio": 1,  /* 1 = Urgent  2 = Medium  3= Low - please put this text to the function witch prio uses */
        "subtasks": [],
        "subtasks-value": [],
        "status": "toDo"
    }
]

