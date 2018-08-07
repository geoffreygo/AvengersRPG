$(document).ready(function () {

    var ironman = {
        name: "Iron Man",
        isChampion: false,
        baseHealth: 120,
        healthPoints: 120,
        baseAttackPower: 7,
        attackPower: 7,
        counterAttack: 11,
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
        counterAttack: 12,
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
        counterAttack: 10,
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
        counterAttack: 13,
        isEnemy: false,
        id: "#hthanos",
        hpid: "#thp",
    };
    // array of player objects, to easily loop them
    var players = [ironman, hulk, ultron, thanos];
    // array of pic element ids
    var pics = ["hironman", "hhulk", "hultron", "hthanos"];
    // to keep track of if the champion has been chosen
    var champChosen = false;
    // to keep track of if an enemy has been chosen
    var enemyChosen = false;
    // will store the player object chosen as champion
    var champ = "";
    // will store the player object chosen as enemy
    var enemy = "";
    // variable to keep track of how many enemies have not been defeated yet
    var unbeaten = 3;
    // to keep track of when to disable the attack button between fights
    var betweenFoes = false;
    // to determine when to reveal the restart button
    var showRestart = false;

    function choosePlayers() {
        // if showRestart is false, hide restart button, if true, show it
        if (!showRestart) {
            $("#btn-restart").hide();
        } else {
            $("#btn-restart").show();
        }
        // when a character is clicked
        $(".character").click(function () {
        // if the champion is not chosen yet
        if (!champChosen) {
            // set chosen to the character element clicked on
            var chosen = this;
            champChosen = true;
            // for each of the players, check if the id of the character matches
            // id in the pics array. If not, prepend that character to the #foes div
            $.each(players, function (i, val) {
                if (pics[i] !== chosen.id) {
                    $("#foes").prepend($(this.id));
                } else {
                    // else if it matches, this is the champion; set champ to the object
                    // of the player chosen as champion
                    players[i].isChampion = true;
                    champ = players[i];
                };
            });
            // update the html elements
            $("#champion").text("Your Chosen Hero");
            $("#opponents").text("Choose Your Opponent!");
        // if the champ has already been chosen and there are foes left unbeaten
        } else if (champChosen && unbeaten > 0) {
            // prepend the selected enemy to the #current-foe div
            $("#current-foe").prepend($("#" + this.id));
            enemyChosen = true;
            // set betweenfoes to false since we are in a fight
            betweenFoes = false;
            // local variable to store the chosen character element
            var localEnemy = this.id;
            // for each of the ids in the pics array, compare to see which is the chosen enemy
            $.each(pics, function (i, val) {
                if (pics[i] === localEnemy) {
                    players[i].isEnemy = true;
                    // when a match is found, store the enemy player object in the enemy var
                    enemy = players[i];
                }
            })
            $("#opponents").text("Opponents Available");
            $("#defender").text("Chosen Defender");
            $("#notify").text("Attack!");
        // if the champ and enemy have been chosen, do nothing when a character is clicked
        } else {
            event.preventDefault();
        }

        })
    };

    // run the function above to begin the game
    choosePlayers();
    // when the attack button is clicked
    $("#btn-attack").click(function () {
        // if there is not a current enemy
        if (betweenFoes) {
            // notify user that they must choose one
            $("#notify").text("There is no-one to attack! Choose an opponent");
            // if the chame and enemy have been chosen
        } else if (champChosen && enemyChosen) {
            // subtract the champ's attack power from the enemy's health
            enemy.healthPoints = enemy.healthPoints - champ.attackPower;
            // if enemy health is less than zero, set it to zero
            if (enemy.healthPoints < 0) {
                enemy.healthPoints = 0;
            };
            // update the enemy health on-screen
            $(enemy.hpid).text(enemy.healthPoints);
            // subtract the enemy's counter attack power from the champ's health
            champ.healthPoints = champ.healthPoints - enemy.counterAttack;
            // if champ health is less than zero, set it to zero
            if (champ.healthPoints < 0) {
                champ.healthPoints = 0;
            };
            $(champ.hpid).text(champ.healthPoints);
            $("#notify").text("You hit " + enemy.name + " for " + champ.attackPower + " points of damage. He hit you for " + enemy.counterAttack + " points of damage.");
            // add the champ's base attack power to the attack power
            champ.attackPower = champ.attackPower + champ.baseAttackPower;
            // if the champ's health is zero, let the player know they lost, set the
            // showRestart button to true, and call choosePlayers to show the restart button
            if (champ.healthPoints === 0) {
                showRestart = true;
                $("#notify").text("You lost! Press restart to try again.");
                choosePlayers();
            // if the enemy's health is at zero
            } else if (enemy.healthPoints === 0) {
                // subtract one from the unbeaten count
                unbeaten--;
                // hide the enemy in the html
                $(enemy.id).hide();
                $("#notify").text("You beat " + enemy.name + "! Choose another opponent carefully, you have " + champ.healthPoints + " health points remaining!")
                // if there are no enemies left, set the showRestart button to true
                if (unbeaten === 0) {
                    showRestart = true;
                    $("#notify").text("You beat all your opponents! Hit restart to play again.");
                }
                // with the enemy beaten, set betwenFoes to true to disable the attack button
                betweenFoes = true;
                // calling choosePlayers will either allow the user to select a new enemy
                // or show the restart button if all enemies have been defeated
                choosePlayers();
            }
        }
    })
    // restart simply reloads the page to restart the game
    $("#btn-restart").click(function () {
        $.each(players, function(i, val) {
            location.reload();
        })

    })

})

