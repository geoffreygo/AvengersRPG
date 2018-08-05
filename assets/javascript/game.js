$(document).ready(function () {

    var ironman = {
        name: "Iron Man",
        isChampion: false,
        baseHealth: 120,
        healthPoints: 120,
        baseAttackPower: 7,
        attackPower: 7,
        counterAttack: 7,
        hasLost: false,
        isEnemy: false,
        id: "#hironman",
    };

    var hulk = {
        name: "Hulk",
        isChampion: false,
        baseHealth: 110,
        healthPoints: 110,
        baseAttackPower: 8,
        attackPower: 8,
        counterAttack: 8,
        hasLost: false,
        isEnemy: false,
        id: "#hhulk",
    };

    var ultron = {
        name: "Ultron",
        isChampion: false,
        baseHealth: 130,
        healthPoints: 130,
        baseAttackPower: 6,
        attackPower: 6,
        counterAttack: 6,
        hasLost: false,
        isEnemy: false,
        id: "#hultron",
    };

    var thanos = {
        name: "Thanos",
        isChampion: false,
        baseHealth: 100,
        healthPoints: 100,
        baseAttackPower: 10,
        attackPower: 10,
        baseCounterAttack: 10,
        hasLost: false,
        isEnemy: false,
        id: "#hthanos",
    };

    var players = [ironman, hulk, ultron, thanos];

    var gameOn = false;

    var pics = ["hironman", "hhulk", "hultron", "hthanos"];
    var champChosen = false;
    var enemyChosen = false;


    if (!gameOn && !champChosen) {
        gameOn = true;
        $(".character").click(function () {
            if (!champChosen) {
            var chosen = this;
            champChosen = true;
            $.each(players, function (i, val) {
                if (pics[i] !== chosen.id) {
                    $("#foes").prepend($(this.id));
                } else {
                    players[i].isChampion = true;
                };
            });
            $("#champion").text("Your Chosen Hero");
            $("#opponents").text("Choose Your Opponent!");
            } else if (champChosen && !enemyChosen) {
                console.log(champChosen);
                console.log(this.id);
                $("#current-foe").prepend($("#" + this.id));
                enemyChosen = true;
                var enemy = this.id;
                $.each(players, function(i, val) {
                    if (pics[i] = enemy) {
                        players[i].isEnemy = true;
                    }
                })
                } else {
                    event.preventDefault();
                }
            })

    }



    })