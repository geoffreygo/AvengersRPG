$(document).ready(function() {

    var ironman = {
        name: "Iron Man",
        isChampion: false,
        baseHealth: 100,
        healthPoints: 100,
        baseAttackPower: 6,
        attackPower: 0,
        baseCounterAttack: 6,
        counterAttack: 0,
        hasLost: false,
        isEnemy: false,
        id: "#hironman",
    };

    var hulk = {
        name: "Hulk",
        isChampion: false,
        baseHealth: 100,
        healthPoints: 100,
        baseAttackPower: 6,
        attackPower: 0,
        baseCounterAttack: 6,
        counterAttack: 0,
        hasLost: false,
        isEnemy: false,
        id: "#hhulk",
    };

    var ultron = {
        name: "Ultron",
        isChampion: false,
        baseHealth: 100,
        healthPoints: 100,
        baseAttackPower: 6,
        attackPower: 0,
        baseCounterAttack: 6,
        counterAttack: 0,
        hasLost: false,
        isEnemy: false,
        id: "#hultron",
    };

    var thanos = {
        name: "Thanos",
        isChampion: false,
        baseHealth: 100,
        healthPoints: 100,
        baseAttackPower: 6,
        attackPower: 0,
        baseCounterAttack: 6,
        counterAttack: 0,
        hasLost: false,
        isEnemy: false,
        id: "#hthanos",
    };

    var players = [ironman, hulk, ultron, thanos];

    var gameOn = false;

    var pics = ["hironman", "hhulk", "hultron", "hthanos"]


   if (!gameOn) {
        $(".character").click(function() {
            console.log(this);
            var chosen = this;
            console.log(chosen.id)
            $.each(players, function(i, val) {               
                console.log(chosen);
                console.log(val);
                if (pics[i] === chosen.id) {
                    players[i].isChampion = true;
                }
            })
            this.isChampion = true;
            $.each(players, function(i, val) {
                if (!this.isChampion) {
                    $("#foes").prepend($(this.id));
                }
            })
        })
    }




})