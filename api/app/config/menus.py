menus = [{
    "id": 1,
    "title": "任务管理",
    "icon": "ios-paper-plane",
    "subs": [{
        "title": "任务列表",
        "id": 11,
        "url": "/tasks",
        "roles": [0,1,2]
    }, {
        "title": "模板列表",
        "id": 12,
        "url": "/templates",
        "roles": [0,1]
    }],
}, {
    "id": 2,
    "title": "收集器管理",
    "icon": "md-laptop",
    "subs": [{
        "title": "收集器列表",
        "id": 21,
        "url": "/agents",
        "roles": [0,1,2]
    }, {
        "title": "包文件管理",
        "id": 22,
        "url": "/package",
        "roles": [0,1,2]
    }],
}, {
    "id": 3,
    "title": "系统管理",
    "icon": "md-settings",
    "subs": [{
        "title": "用户列表",
        "id": 31,
        "url": "/users",
        "roles": [0,1]
    }],
}]

def get_menus(role):
    user_menus = []
    for menu in menus:
        menu_item = {
            "id": menu["id"],
            "title": menu["title"],
            "icon": menu["icon"],
            "subs": []
        }
        for sub in menu["subs"]:
            if role in sub["roles"]:
                menu_item["subs"].append(sub)
        if len(menu_item["subs"]) > 0:
            user_menus.append(menu_item)
    return user_menus