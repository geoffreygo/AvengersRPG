$(document).ready(function () {

    var ironman = {
        name: "Iron Man",
        isChampion: false,
        baseHealth: 120,
        healthPoints: 120,
        baseAttackPower: 7,
        attackPower: 7,
        isEnemy: false,
        id: "#hironman",
        hpid: "#ihp",
    };

    var hulk = {
        name: "Hulk",
        isChampion: false,
        baseHealth: 110,
        healthPoints: 110,
        baseAttackPower: 8,
        attackPower: 8,
        isEnemy: false,
        id: "#hhulk",
        hpid: "#hhp",
    };

    var ultron = {
        name: "Ultron",
        isChampion: false,
        baseHealth: 130,
        healthPoints: 130,
        baseAttackPower: 6,
        attackPower: 6,
        isEnemy: false,
        id: "#hultron",
        hpid: "#uhp",
    };

    var thanos = {
        name: "Thanos",
        isChampion: false,
        baseHealth: 100,
        healthPoints: 100,
        baseAttackPower: 10,
        attackPower: 10,
        isEnemy: false,
        id: "#hthanos",
        hpid: "#thp",
    };

    var players = [ironman, hulk, ultron, thanos];
    var pics = ["hironman", "hhulk", "hultron", "hthanos"];
    var champChosen = false;
    var enemyChosen = false;
    var champ = "";
    var enemy = "";
    var unbeaten = 3;
    var betweenFoes = false;
    var showRestart = false;

    function choosePlayers() {
        if (!showRestart) {
            $("#btn-restart").hide();
        } else {
            $("#btn-restart").show();
        }
        $(".character").click(function () {
        if (!champChosen) {
            var chosen = this;
            champChosen = true;
            $.each(players, function (i, val) {
                if (pics[i] !== chosen.id) {
                    $("#foes").prepend($(this.id));
                } else {
                    players[i].isChampion = true;
                    champ = players[i];
                };
            });
            $("#champion").text("Your Chosen Hero");
            $("#opponents").text("Choose Your Opponent!");
        } else if (champChosen && unbeaten > 0) {
            // console.log(champChosen);
            // console.log(this.id);
            $("#current-foe").prepend($("#" + this.id));
            enemyChosen = true;
            betweenFoes = false;
            var localEnemy = this.id;
            // console.log(this.id);
            $.each(pics, function (i, val) {
                // console.log(pics[i]);
                if (pics[i] === localEnemy) {
                    // console.log(players[i]);
                    players[i].isEnemy = true;
                    enemy = players[i];
                }
            })
            $("#opponents").text("Opponents Available");
            $("#defender").text("Chosen Defender!");
        } else {
            event.preventDefault();
        }

        })
    };
    choosePlayers();

    $("#btn-attack").click(function () {
        if (betweenFoes) {
            $("#notify").text("There is no-one to attack! Choose an opponent");
        } else if (champChosen && enemyChosen) {           
            enemy.healthPoints = enemy.healthPoints - champ.attackPower;
            $(enemy.hpid).text(enemy.healthPoints);
            champ.healthPoints = champ.healthPoints - enemy.attackPower;
            $(champ.hpid).text(champ.healthPoints);
            $("#notify").text("You hit " + enemy.name + " for " + champ.attackPower + " points of damage. He hit you for " + enemy.attackPower + " points of damage.");
            champ.attackPower = champ.attackPower + champ.baseAttackPower;
            if (champ.healthPoints <= 0) {
                showRestart = true;
                $("#notify").text("You lost! Press restart to try again.")
                return;
            } else if (enemy.healthPoints <= 0) {
                unbeaten--;
                $(enemy.id).hide();
                $("#notify").text("You beat " + enemy.name + "! Choose another opponent carefully, you have " + champ.healthPoints + " health points remaining!")
                if (unbeaten === 0) {
                    showRestart = true;
                    $("#notify").text("You beat all your opponents! Hit restart to play again.");
                }
                betweenFoes = true;
                choosePlayers();
            }
        }
    })

    $("#btn-restart").click(function () {
        $.each(players, function(i, val) {
            players[i].isChampion = false;
            players[i].healthPoints = players[i].baseHealth;
            players[i].attackPower = players[i].baseAttackPower;
            players[i].isEnemy = false;
            var champChosen = false;
            var enemyChosen = false;
            var champ = "";
            var enemy = "";
            var unbeaten = 3;
            location.reload();
        })

    })

})

