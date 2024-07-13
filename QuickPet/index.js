let active = false;
let query = "";
let delay = 100;

register("command", (x) => {
    active = true;
    query = x;
    switch (query.toLowerCase()) {
        case "edrag":
            query = "ender dragon";
            break;
        case "gdrag":
        case "greg":
            query = "golden dragon";
            break;
        case "eman":
            query = "enderman";
            break;
    }
    ChatLib.command("pet");
}).setName("quickpet").setAliases("quickp", "qpet", "qp");

register("step", () => {
    let inv = Player.getContainer();
    if (active && inv.getName().includes("Pets")) {
        active = false;
        new Thread(() => {
            Thread.sleep(delay);
            let items = inv.getItems();
            let found = false;
            for (let i = 10; i <= 43; i++) {
                if (items[i] === null) continue;
                let pet = items[i];
                if (pet.getName().toLowerCase().includes(query.toLowerCase())) {
                    inv.click(i, false);
                    found = true;
                    break;
                }
            }
            if (!found) {
                Client.currentGui.close();
                ChatLib.chat("&cCouldn't find a match for \"" + query + "\".");
            }
        }).start();
    }
}).setFps(5);
