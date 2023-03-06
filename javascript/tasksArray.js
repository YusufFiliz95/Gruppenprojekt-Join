/* @ Christoph - wie lösen wir das mit der category-color, einfach mit einem RGB Code/ Hexcode ?? Wär glaub ich am einfachsten 
    danach mit classList arbeiten - 
    @ Yusuf dasselbe bei den contacts oder?*/


let tasks = [
    {
        "title": "Einkaufen",
        "discription": "Ich muss heute noch einkaufen",
        "category": "Lebensmittel",
        "category-color": "#000000",
        "contacts": [
            {                       /* @Christoph - reicht das für unsere Anwendung, also name, initials und color ?? */
                "name": "Tobias Ruhmanseder",
                "initials": "TR",
                "color": "#7AE229"  
            }
        ],
        "date": "timestamp",
        "prio": 1,  /* 1 = Urgent  2 = Medium  3= Low - please put this text to the function witch prio uses */
        "subtasks": [],
        "status": "toDo"
    },
    {
        "title": "Wäsche waschen",
        "discription": "Die Waschmaschine muss heute noch vollgas laufen",
        "category": "Hausarbeit",
        "category-color": "#FF7A00",
        "contacts": [],
        "date": "timestamp",
        "prio": 1,  /* 1 = Urgent  2 = Medium  3= Low */
        "subtasks": [],
        "status": "toDo"
    }
]