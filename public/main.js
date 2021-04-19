const socket = io.connect();
const media = window.matchMedia('(max-width: 800px)'); // if (media.matches) width < 800px

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// ? _util functions
function addElement(parentId, elementTag, elementId, html) {
    const parent = document.getElementById(parentId)
    const newElement = document.createElement(elementTag)
    if (elementId != '') newElement.setAttribute('id', elementId)
    newElement.innerHTML = html
    parent.appendChild(newElement)
}

function removeElement(elementId) {
    const element = document.getElementById(elementId)
    element.parentNode.removeChild(element)
}

function getRnd(min, max) {
    return Math.random() * (max - min) + min
}

function genSongInfo(id = "songX", name, infocode, mins, secs, src) {
    let txt = "";
    const nameLen = name.length;
    txt += '{id: "' + id + '", name: "' + name + id + '", infocode: "' + infocode + '", mins: ' + mins + ', secs: ' + secs + ', src: "' + src + '", nameLen: ' + nameLen + ', lyrics: NO_LYRICS},';
    console.log(txt);

    // * infocode:
    //      ic[0] = (0 for original, 1 for cover)
    //      ic[1] = (0 for instrumental, 1 for singing)
    //      ic[2] = (0 for guitar, 1 for piano, 2 for both)
    //      ic[3] = (o for simon, 1 for evgenija, 2 for both)
}
// e.g. genSongInfo('song21', 'Jar Of Hearts [Christina Perri]', '1122', 3, 19, './audio/bcsb-JarOfHeartsNew.m4a');

const aboutThisGirlLyrics = "***<br><br>It was a perfect sunny day to spend outside,<br>The city park being the lucky place,<br>To be where it all began.<br><br>It was a perfect sunny day for laughs and laughs,<br>Bubi and Robi being the lucky ones,<br>To be how it all began.<br><br>It was already so perfect,<br>Looking, looking back even perfecter,<br>And now it's become the perfectest...<br>Let me tell you about this girl...<br><br>(x2)<br>With a smile that [warms] / [melts] the heart,<br>And with a voice that [takes your breath away] / [makes your day],<br>With a touch that [makes your blood rush] / [soothes your just right],<br>And with a heart so pure and gentle,<br>I could never ever have met a lovelier girl...<br><br>***<br><br>Let's celebrate all that we have...<br>All the times we turned our shy faces away;<br>All the times our hearts skiipped a beat,<br>When our roads would accidentally cross;<br>All the times we were brave enough to hug;<br>All the times we shared our music tastes;<br>All the times it was just me and you,<br>When time would stop and you'd be all that matters.<br><br>It was already so perfect,<br>Looking, looking back even perfecter,<br>And now it's become the perfectest...<br>Let me tell you about this girl...<br><br>(x2)<br>With a smile that [warms] / [melts] the heart,<br>And with a voice that [takes your breath away] / [makes your day],<br>With a touch that [makes your blood rush] / [soothes your just right],<br>And with a heart so pure and gentle,<br>I could never ever have met a lovelier girl...";
const goForwardLyrics = "It has always bothered you hasn't it,<br>You fall and you think it's over,<br>You fall and you feel you cannot get up.<br><br>Perhaps what you've failed to realize,<br>Is that when you fall, you choose the direction,<br>You can choose to win, choose to fall forward.<br><br>***<br><br>It has always bothered you hasn't it,<br>You feel a minor fail like a fatal blow,<br>You burry yourself underneath the failure spotlight.<br><br>Perhaps what you've failed to realize,<br>Is that you are in the spotlight,<br>And you can own the situation, by choosing to go forward...<br><br>***<br><br>Recognize your mistake, as a call to grow<br>Don't let it go to waste, make it count,<br>Stand up straight with your shoulders back, and<br>Don't have a single care about anyone else's opinion.<br><br>Find a way to learn from it, without a word to prove your worth,<br>Find a way to not repeat it, and forget it ever happened.<br>This is how you own it, own it, own it,<br>This is how you go forward.<br><br>Recognize your mistake, as a call to grow<br>Don't let it go to waste, make it count,<br>Stand up straight with your shoulders back, and<br>Don't have a single care about anyone else's opinion.<br><br>Find a way to learn from it, without a word to prove your worth,<br>Find a way to not repeat it, and forget it ever happened.<br><br>***";
const loveYourselfLyrics = "***<br><br>A roadmap in my head<br>I need this person to like this, I really do.<br><br>...And another to need that,<br>And I'll be, be okay.<br><br>And I take the steps, With careful planning,<br>This must not go wrong, It's who I am.<br><br>I know it's an illusion, I shouldn't believe it,<br>Yet for some reason, I can't let go.<br><br>And I keep telling myself...<br><br>Chorus: (x2)<br>Love yourself,<br>Love every little thing you do, oo o o.<br><br>***<br><br>And perhaps one day, I'll listen to my own advice,<br>God I certainly hope so, I do.<br><br>And perhaps one day, I'll learn to be happy,<br>With what I have done, and not the reactions it gets.<br><br>And perhaps one day, I'll learn to be happy,<br>On my own, oo o own.<br><br>And perhaps from that day, I could follow my dream,<br>To make the world a better place.<br><br>And I'll keep telling myself...<br><br>Chorus: (x2)<br>Love yourself,<br>Love every little thing you do, oo o o.<br><br>***<br><br>And I'll keep telling myself...<br><br>Chorus: (x4)<br>Love yourself,<br>Love every little thing you do, oo o o.";
const wastingYourTimeLyrics = "***<br><br>Every day it's the same old pattern,<br>Wake up, waste your time, go to bed.<br>Every day you ask yourself,<br>What is, what is wrong with me?<br><br>So, it's only natural, to ask,<br>How can I fix this?<br><br>You come up with strategies, only to,<br>Throw them away in a day or two.<br>And again, and again, and again,<br>Plan and plan and it's never good enough.<br><br>No, I refuse to believe,<br>There must be a way to fix this.<br><br>(x2)<br>And I know there is a way,<br>I am so, so very sure,<br>Please just let me try...<br>Please just let me try...<br><br>...to find it.";
const surprisesLyrics = "Hey, C'mon, Wakey, Wakey, Wakey,<br>Get up, I'm waiting, since 10 in the morning.<br><br>I know, and I'm sorry,<br>I have 10 missed alarms.<br>Hey, by the way, I wanna know,<br>The surprise, you promised, remember?<br><br>***<br><br>For me, it's just another ordinary day,<br>Having no idea of the events in action.<br><br>For you, who has to come up with the perfect plan,<br>I imagine things are quite different,<br>Heartbeat faster than a shooting star.<br><br>If you just knew, how totally clueless I was, Of your plan,<br>perhaps you wouldn't panic so much.<br><br>Or perhaps you still would,<br>Would it even be a surprise,<br>Without believing that you've ruined it?<br><br>***<br><br>In any case, it was just beautiful, it was.<br>In any case, it was just beautiful, it was.<br>It was beautiful, thank you.";
const limitlessLyrics = "***<br><br>All my life, I've been told,<br>What I can and what I cannot.<br><br>Well, guess what, I don't want to live,<br>By your rules, anymore.<br><br>***<br><br>I can do anything I want.<br>I will do anyhing I want.<br><br>***<br><br>I have come to understand,<br>That I'm limitless.<br><br>And if you try to tell me otherwise,<br>I'll do my best to ignore you.<br><br>***<br><br>I can do anything I want.<br>I will do anything I want.<br><br>***<br><br>I can do anything I want.<br>I will do anything I want.";
const mindsetLyrics = "All the disasters this year,<br>Overshadow the good,<br>The good in this world.<br><br>We all miss the old times,<br>But it does us no well,<br>To dwell on the past.<br><br>We must look forward to the future, don't we?<br>We just have to try a little harder, to find,<br>The beauty hidden from us, cuz there's a lot.<br><br>Now let our minds fly,<br>And explore,<br>We all can be happy, we can.<br><br>Every day is a new chance,<br>To explore,<br>And create what makes us happy.";
const lifeLyrics = "***<br><br>We don't always realize,<br>How many stars have burned up,<br>So that we can exist.<br><br>How many miracles have happened,<br>So that we are granted<br>The privilege of this experience.<br><br>I know, I know, you can say,<br>Sometimes it feels like a curse.<br>But how can that compare to the times,<br>When it feels like a million explosions of pure joy.<br><br>It's weird how everything makes no sense at all,<br>and yet makes so perfect a sense.<br><br>Because we are human,<br>We can love and we can cry.<br>We can cherish the life that we've got,<br>Or tear it apart into hate.<br><br>***<br><br>And like one world wasn't enough,<br>We have a perfect way to escape it,<br>By building a different one in our heads.<br><br>I know, I know, you can say,<br>Sometimes it feels like a curse.<br>But what if we learn to control it,<br>I believe we can.<br><br>(x2)<br>Because we are human,<br>We can love and we can cry.<br>We can cherish the life that we've got,<br>And we should. / Cherish every moment.<br><br>We hold to our precious memories,<br>We hold tight and we never let go.<br>Now is our chance to make new precious ones,<br>For our future selves to hold tight.";
const magicalMomentsLyrics = "***<br><br>Picture this scenario, sitting alone in your room, at night.<br>A corner of the world you have so perfectly for you created.<br><br>It's one of the best feelings in the world, you feel free and on your own.<br>But it doesn't scare you, this time it just makes it so much better.<br><br>As if it could read your mind, the rain starts falling down.<br>You start playing the piano, even though you realize it's 2 in the morning.<br><br>And though the night just lasts a couple of hours, it feels like all eternity.<br>Oh, these magical moments, it's what we live for.<br><br>***<br><br>You want it to last forever I know, this ecstasy of joy.<br>Well, I want it too, but it doesn't work this way, every day.<br><br>Perhaps this moment's beauty is in its fleeting existence.<br>Yet every little feeling it brings, I fully accept, they are truly the best.<br><br>***<br><br>Oh, these magical moments...<br>Oh, these magical moments, it's what we live for.<br><br>***";
const wishesLyrics = "Happy birthday to you my dear,<br>May all your wishes come true.<br><br>I wanna see you in Dubai<br>With Passenger on stage,<br>Like you've always wanted dear,<br>I wanna see us there.<br><br>I wanna hear you play,<br>Get lost in the guitar or piano.<br>I wanna watch you have dear<br>The time of your life.<br><br>I wanna play with you lovely hair,<br>I wanna see your lovely smile,<br>I wanna feel your cozy kisses, and<br>I wanna hear your cozy voice.<br><br>***<br><br>I wanna play with you lovely hair,<br>I wanna see your lovely smile,<br>I wanna feel your cozy kisses, and<br>I wanna hear your cozy voice.<br><br>Oh, and there's something I forgot,<br>So here's my post scriptum:<br>I wanna as well eat some cake.";
const twiceUponATimeLyrics = "There was a time<br>When we were<br>Just two shy kids,<br>mmm...<br><br>Chasing each other,<br>Day and night, Whenever<br>We got the chance,<br>mmm...<br><br>(x2):<br>We were walking,<br>Slowly but surely,<br>Towards each other<br>(1st time): Slowly but surely.<br>(2nd time): We were walking...<br><br>Until one day we decided,<br>To spice up our story,<br>We decided that we would run.<br><br>(Chorus x2):<br>And we ran and ran and ran,<br>Day and night, when we got the change,<br>Cuz it was fun, to run and run and run,<br>(1st time): It was fun, and we liked it.<br>(2nd time): It was fun, and we loved it.<br><br>And I wouldn't replace a single moment,<br>For anything in the world.<br>I love you darling, more than<br>Anything in the world.<br><br>And I remember, when we would...<br>(Chorus x3):<br>And we ran and ran and ran,<br>Day and night, when we got the change,<br>Cuz it was fun, to run and run and run,<br>(1st time): It was fun, and we liked it.<br>(2nd / 3rd time): It was fun, and we loved it.<br><br>(x2):<br>And I loved you.<br>And you loved me.<br>And we loved each other.<br><br>Oh, It was fun, and we loved it.";
const imGladIFoundYouLyrics = "Take me into the night,<br>Into your arms, hug me tight.<br>In the cold you'll be my warmth,<br>In the dark I'll be your light.<br><br>Take me, sky high,<br>I'll show you how to fly.<br>In my wars, you'll be my peace,<br>In your skies, I'll be the stars.<br><br>(x2):<br>Oh yea, I'm glad I found you.<br><br>***<br><br>Take me, into adventures,<br>On the snow or in the water.<br>In the air, you'll be my parachute,<br>In the water, I'll be your safety net.<br><br>Take me, love me well,<br>Kiss me softly, I'll love you well.<br>On my birthday, you'll be my Fefi,<br>And on yours, I'll be your Pinko.<br><br>(x4):<br>Oh yea, I'm glad I found you.";
const opportunityLyrics = "Hello, anybody? Am I all... alone?<br>It's fine, I don/t mind. It's just that, alone...<br><br>Memories are getting darker, day by day, but,<br>What's left for me to do now, but reminisce?<br><br>The years I played away, turns out,<br>They weren't wasted, they were the best.<br>The sunsets I used to watch...<br><br>All the little sandcastles I loved to bits,<br>All the little snowmen I wish I had made,<br>All the regrets that I now have...<br><br>Turns out everybody was right, they said life live to the fullest.<br>But I, I was too young to listen now I am too old to cry.<br><br>And now I worry, the sun is getting darker, again,<br>But this time I fear, there will be no sunrise.<br><br>And all I'm left with, is a lot of confusion,<br>And a lot to think about, and so little time.<br><br>Was all my purpose all this time, to be a little robot,<br>On this red planet, all alone?<br><br>***";
const aSpecialMorningLyrics = "***<br><br>Chorus:<br>Waking up, with you, by my side, was enough.<br>I felt safer, than any time before.<br>All this love in the air, felt save to breathe.<br>Your eyes, full of sparks, kept me warm.<br><br>***<br><br>Snowflakes dancing outside,<br>Radio echoing inside,<br>Tea brewing silently,<br>Smiles sent with love.<br><br>Our heartbeats syncrhonized,<br>Hugs and hugs that keep us warm,<br>My lips softly touching yours,<br>Oxytocin flying around.<br><br>Chorus:<br>Waking up, with you, by my side, was enough.<br>I felt safer, than any time before.<br>All this love in the air, felt save to breathe.<br>Your eyes, full of sparks, kept me warm.<br><br>***<br><br>Sledding in the snow,<br>Snow in the photographs,<br>Photographs in memories,<br>Memories in happy smiles.<br><br>Keypresses on piano,<br>Into a song,<br>The song into a feeling,<br>The feeling of love.<br><br>Chorus:<br>Waking up, with you, by my side, was enough.<br>I felt safer, than any time before.<br>All this love in the air, felt save to breathe.<br>Your eyes, full of sparks, kept me warm.<br><br>***<br><br>Your eyes, full of sparks, kept me warm.";
const aHumanThatMakesMistakesLyrics = "";

const hopeLyrics = "God, what have we become?<br>We turned into monsters,<br>lurking every moment,<br>into evil souls,<br>into evil silhouettes that break golden hearts.<br><br>Is there at least<br>A little hope left?<br>Hope for less malice,<br>Hope for melting stone hearts.<br><br>Are we going to throw out the selfishness<br>That has been poisoning us for a long time?<br><br>Is there at least<br>A little hope left?<br>Hope for less malice,<br>Hope for melting stone hearts.";
const feelTheLightLyrics = "The night is white,<br>I am outside,<br>I am feeling the light.<br><br>(x2)<br>Oh, my face is cold,<br>But my soul is warm,<br>Oh, tonight,<br>Feel the light.<br><br>My heart is full,<br>There is no rule,<br>Just feel the light.<br><br>(x2)<br>Oh, my face is cold,<br>But my soul is warm,<br>Oh, tonight,<br>Feel the light.";
const fightLyrics = "***<br><br>My brain is burning, my brain is burning.<br>Calmly, quietly I wait for an explosion of thoughts.<br>The water in my eyes is slowly coming,<br>Giggling towards me and posing a challenge,<br>For an unforgettable fight.<br><br>Chorus (x2):<br>The spirit in me trembles, trembles, trembles,<br>It slowly disintigrates into a glowing silhouette.<br>Light blinds evil spirits.<br><br>***<br><br>I am good, I am good,<br>Invincible, invincible,<br>always and everywhere.<br>I am good... I am good...<br>Let it be an unforgettable fight.<br><br>Chorus (x2):<br>The spirit in me trembles, trembles, trembles,<br>It slowly disintigrates into a glowing silhouette.<br>Light blinds evil spirits."

const NO_LYRICS = "none";
const LAST_SONG_ID = 66;

const allSongs = [
    {id: "song66", name: "Earth [Sleeping At Last]song66", infocode: "1110", mins: 3, secs: 40, src: "../audio/scsp-Earth.m4a", nameLen: 24, lyrics: NO_LYRICS},
    {id: "song65", name: "A Human That Makes Mistakessong65", infocode: "0100", mins: 1, secs: 41, src: "../audio/sosg-AHumanThatMakesMistakes.m4a", nameLen: 27, lyrics: aHumanThatMakesMistakesLyrics},
    {id: "song64", name: "Fightsong64", infocode: "0111", mins: 4, secs: 2, src: "../audio/eosp-Fight.m4a", nameLen: 5, lyrics: fightLyrics},
    {id: "song63", name: "A Special Morningsong63", infocode: "0110", mins: 2, secs: 31, src: "../audio/sosp-ASpecialMorning.m4a", nameLen: 17, lyrics: aSpecialMorningLyrics},
    {id: "song62", name: "Opportunitysong62", infocode: "0100", mins: 2, secs: 39, src: "../audio/sosg-Opportunity.m4a", nameLen: 11, lyrics: opportunityLyrics},
    {id: "song61", name: "Driver's License [Olivia Rodrigo]song61", infocode: "1110", mins: 3, secs: 38, src: "../audio/scsp-DriversLicense.m4a", nameLen: 33, lyrics: NO_LYRICS},
    {id: "song60", name: "I'm Glad I Found Yousong60", infocode: "0100", mins: 1, secs: 58, src: "../audio/sosg-ImGladIFoundYou.m4a", nameLen: 20, lyrics: imGladIFoundYouLyrics},
    {id: "song59", name: "I'll Keep You Safe [Sleeping At Last]song59", infocode: "1110", mins: 3, secs: 56, src: "../audio/scsp-KeepYouSafe.m4a", nameLen: 37, lyrics: NO_LYRICS},
    {id: "song58", name: "Twice Upon A Timesong58", infocode: "0110", mins: 2, secs: 13, src: "../audio/sosp-TwiceUponATime.m4a", nameLen: 17, lyrics: twiceUponATimeLyrics},
    {id: "song57", name: "Wishessong57", infocode: "0110", mins: 2, secs: 17, src: "../audio/sosp-Wishes.m4a", nameLen: 6, lyrics: wishesLyrics},
    {id: "song56", name: "Mountainsong56", infocode: "0010", mins: 2, secs: 12, src: "../audio/soip-Mountain.m4a", nameLen: 8, lyrics: NO_LYRICS},
    {id: "song54", name: "Magical Momentssong54", infocode: "0100", mins: 2, secs: 9, src: "../audio/sosg-MagicalMoments.m4a", nameLen: 15, lyrics: magicalMomentsLyrics},
    {id: "song53", name: "Wintersong53", infocode: "0011", mins: 1, secs: 36, src: "../audio/eoip-WinterNew.m4a", nameLen: 6, lyrics: NO_LYRICS},
    {id: "song52", name: "Feel The Lightsong52", infocode: "0101", mins: 1, secs: 47, src: "../audio/eosg-FeelTheLight.m4a", nameLen: 14, lyrics: feelTheLightLyrics},
    {id: "song51", name: "Lifesong51", infocode: "0110", mins: 3, secs: 22, src: "../audio/sosp-Life.m4a", nameLen: 4, lyrics: lifeLyrics},
    {id: "song50", name: "Concert 18.12.2020 🥳 (50th Upload)song50", infocode: "0012", mins: 11, secs: 54, src: "../audio/boip-Concert_18-12-2020.m4a", nameLen: 35, lyrics: NO_LYRICS},
    {id: "song48", name: "Limitlesssong48", infocode: "0100", mins: 3, secs: 38, src: "../audio/sosg-Limitless.m4a", nameLen: 9, lyrics: limitlessLyrics},
    {id: "song46", name: "Surprisessong46", infocode: "0110", mins: 1, secs: 54, src: "../audio/sosp-Surprises.mp3", nameLen: 9, lyrics: surprisesLyrics},
    {id: "song45", name: "Golden Leaves [Passenger]song45", infocode: "1100", mins: 3, secs: 27, src: "../audio/scsg-GoldenLeaves.m4a", nameLen: 25, lyrics: NO_LYRICS},
    {id: "song44", name: "Before You Go [Lewis Capaldi]song44", infocode: "1111", mins: 3, secs: 28, src: "../audio/ecsp-BeforeYouGo.m4a", nameLen: 29, lyrics: NO_LYRICS},
    {id: "song43", name: "Mistletoe [Justin Bieber]song43", infocode: "1101", mins: 3, secs: 7, src: "../audio/ecsg-Mistletoe.m4a", nameLen: 25, lyrics: NO_LYRICS},
    {id: "song41", name: "Sign Of The Times [Harry Styles]song41", infocode: "1111", mins: 4, secs: 42, src: "../audio/ecsp-SignOfTheTimes.m4a", nameLen: 32, lyrics: NO_LYRICS},
    {id: "song40", name: "Love Yourselfsong40", infocode: "0100", mins: 2, secs: 44, src: "../audio/sosg-LoveYourself.m4a", nameLen: 13, lyrics: loveYourselfLyrics},
    {id: "song39", name: "Two [Sleeping At Last]song39", infocode: "1100", mins: 3, secs: 36, src: "../audio/scsg-Two.m4a", nameLen: 22, lyrics: NO_LYRICS},
    {id: "song38", name: "Silent Nightsong38", infocode: "1101", mins: 3, secs: 27, src: "../audio/ecsg-SilentNight.m4a", nameLen: 12, lyrics: NO_LYRICS},
    {id: "song37", name: "Improvisationssong37", infocode: "0010", mins: 2, secs: 20, src: "../audio/soip-Improvisations.mp3", nameLen: 14, lyrics: NO_LYRICS},
    {id: "song35", name: "Let Her Go [Passenger]song35", infocode: "1102", mins: 3, secs: 55, src: "../audio/bcsg-LetHerGo.m4a", nameLen: 22, lyrics: NO_LYRICS},
    {id: "song33", name: "Photograph [Ed Sheeran]song33", infocode: "1122", mins: 3, secs: 56, src: "../audio/bcsb-Photograph.m4a", nameLen: 23, lyrics: NO_LYRICS},
    {id: "song31", name: "Hopesong31", infocode: "0101", mins: 2, secs: 32, src: "../audio/eosg-HopeNew.m4a", nameLen: 4, lyrics: hopeLyrics},
    {id: "song30", name: "Concert 19.10.2020song30", infocode: "0012", mins: 3, secs: 16, src: "../audio/bosp-Concert_19-10-2020.m4a", nameLen: 18, lyrics: NO_LYRICS},
    {id: "song26", name: "About This Girlsong26", infocode: "0100", mins: 3, secs: 22, src: "../audio/sosg-AboutThisGirlNew.m4a", nameLen: 15, lyrics: aboutThisGirlLyrics},
    {id: "song27", name: "Go Forwardsong27", infocode: "0100", mins: 4, secs: 0, src: "../audio/sosg-GoForward.m4a", nameLen: 10, lyrics: goForwardLyrics},
    {id: "song25", name: "Ice Creamsong25", infocode: "0010", mins: 2, secs: 48, src: "../audio/soip-IceCream.m4a", nameLen: 9, lyrics: NO_LYRICS},
    {id: "song24", name: "Beautiful Birds [Passenger]song24", infocode: "1122", mins: 2, secs: 52, src: "../audio/bcsb-BeautifulBirds.m4a", nameLen: 27, lyrics: NO_LYRICS},
    {id: "song23", name: "Bella Ciaosong23", infocode: "1111", mins: 2, secs: 15, src: "../audio/ecsp-BellaCiaoNew.m4a", nameLen: 10, lyrics: NO_LYRICS},
    {id: "song22", name: "Quarantinesong22", infocode: "0011", mins: 1, secs: 0, src: "../audio/eoip-Quarantine.m4a", nameLen: 10, lyrics: NO_LYRICS},
    {id: "song21", name: "Jar Of Hearts [Christina Perri]song21", infocode: "1122", mins: 3, secs: 29, src: "../audio/bcsb-JarOfHeartsNew.m4a", nameLen: 31, lyrics: NO_LYRICS},
    {id: "song19", name: "Try [Pink]song19", infocode: "1101", mins: 1, secs: 48, src: "../audio/ecsg-Try.m4a", nameLen: 10, lyrics: NO_LYRICS},
    {id: "song15", name: "Iraesong15", infocode: "0011", mins: 2, secs: 1, src: "../audio/eoip-Irae.m4a", nameLen: 4, lyrics: NO_LYRICS},
    {id: "song14", name: "Hall Of Hellsong14", infocode: "0011", mins: 2, secs: 17, src: "../audio/eoip-HallOfHell.m4a", nameLen: 12, lyrics: NO_LYRICS},
    {id: "song13", name: "Annihilationsong13", infocode: "0011", mins: 1, secs: 5, src: "../audio/eoip-Annihilation.m4a", nameLen: 12, lyrics: NO_LYRICS},
    {id: "song12", name: "Astrumsong12", infocode: "0011", mins: 0, secs: 56, src: "../audio/eoip-Astrum.m4a", nameLen: 6, lyrics: NO_LYRICS},
    {id: "song11", name: "Heart's Tracesong11", infocode: "0011", mins: 2, secs: 31, src: "../audio/eoip-HeartsTrace.m4a", nameLen: 13, lyrics: NO_LYRICS},
    {id: "song10", name: "Always Remember Us This Way [Lady Gaga]song10", infocode: "1111", mins: 2, secs: 27, src: "../audio/ecsp-AlwaysRememberUsThisWay.m4a", nameLen: 39, lyrics: NO_LYRICS},
    {id: "song6", name: "Emiriasong6", infocode: "0010", mins: 1, secs: 3, src: "../audio/soip-GiftInEm.m4a", nameLen: 6, lyrics: NO_LYRICS},
    {id: "song4", name: "Hi :)song4", infocode: "0010", mins: 1, secs: 45, src: "../audio/soip-Hi.m4a", nameLen: 5, lyrics: NO_LYRICS},
    {id: "song2", name: "Aiterkastersong2", infocode: "0010", mins: 2, secs: 24, src: "../audio/soip-Aiterkaster.m4a", nameLen: 11, lyrics: NO_LYRICS},
];

const TOTAL_SONGS = allSongs.length;

const sortinfoAll = [
    {label: "No sorting.", ordercode: 'x'},
    {label: "All songs.", ordercode: 'x'},
]

const sortinfoAuthors = [
    {label: 'Sorted by: Authors.', ordercode: 3},
    {label: "Sims & Evs's songs.", ordercode: '2'},
    {label: "Simon's songs.", ordercode: '0'},
    {label: "Evs's songs.", ordercode: '1'},
]

const sortinfoInstruments = [
    {label: 'Sorted by: Instruments.', ordercode: 2},
    {label: "Guitar & Piano songs.", ordercode: '2'},
    {label: "Guitar songs.", ordercode: '0'},
    {label: "Piano songs.", ordercode: '1'},
]

const sortinfoOriginality = [
    {label: 'Sorted by: Originality.', ordercode: 0},
    {label: "Original songs.", ordercode: '0'},
    {label: "Cover songs.", ordercode: '1'},
]

const sortinfoVocals = [
    {label: 'Sorted by: Vocals.', ordercode: 1},
    {label: "Lyrical songs.", ordercode: '1'},
    {label: "Instrumental songs.", ordercode: '0'},
]

function addClassesToCircles(c1, c2, c3, c4, infocode) {
    const e1 = $('#'+c1);
    const e2 = $('#'+c2);
    const e3 = $('#'+c3);
    const e4 = $('#'+c4);
    e1.addClass('originality'+infocode[0]);
    e2.addClass('vocals'+infocode[1]);
    e3.addClass('instrument'+infocode[2]);
    e4.addClass('author'+infocode[3]);
}

function addSongsToDiv(WHICH_DIV, sortinfo) {
    $('#'+WHICH_DIV).empty();
    const nullPrefix = '0';

    const baseLabel = sortinfo[0].label;
    const ordercodeidx = sortinfo[0].ordercode;

    let IDX = 0;
    const SORT_LABEL = nullPrefix + 'BL' + IDX++;
    addElement(WHICH_DIV, 'p', SORT_LABEL, baseLabel);
    // addElement(WHICH_DIV, 'p', SORT_LABEL, 'Test1');

    const ALL_INSTANCES_CONTAINER = nullPrefix + 'AIC' + IDX++;
    addElement(WHICH_DIV, 'div', ALL_INSTANCES_CONTAINER, '');

    let ITERS = 2;
    if (ordercodeidx != 'x') ITERS = sortinfo.length;

    for (let i = 1; i < ITERS; i++) {
        const currentInstance = sortinfo[i];
        const SINGLE_INSTANCE_CONTAINER = nullPrefix + 'SIC' + IDX++;
        addElement(ALL_INSTANCES_CONTAINER, 'div', SINGLE_INSTANCE_CONTAINER, '');

        const SPECIFIC_SORT_LABEL = nullPrefix + 'SSL' + IDX++;
        // addElement(SINGLE_INSTANCE_CONTAINER, 'p', SPECIFIC_SORT_LABEL, 'Phase 1');
        addElement(SINGLE_INSTANCE_CONTAINER, 'p', SPECIFIC_SORT_LABEL, currentInstance.label);

        const ALL_SONGS_CONTAINER = nullPrefix + 'ASC' + IDX++;
        addElement(SINGLE_INSTANCE_CONTAINER, 'div', ALL_SONGS_CONTAINER, '');

        allSongs.forEach(song => {
            if (!(ordercodeidx == 'x') && song.infocode[ordercodeidx] != currentInstance.ordercode) ;
            else {
                const idPrefix = song.id.length + song.id;

                const SINGLE_SONG_CONTAINER = idPrefix + 'SSC';
                addElement(ALL_SONGS_CONTAINER, 'div', SINGLE_SONG_CONTAINER, '');
                
                const SONG_CIRCLES_CONTAINER_1 = idPrefix + 'SCC1';
                const SONG_CIRCLES_CONTAINER_2 = idPrefix + 'SCC2';
                const SONG_CIRCLES_CONTAINER_3 = idPrefix + 'SCC3';
                const SONG_CIRCLES_CONTAINER_4 = idPrefix + 'SCC4';
                const SONG_CIRCLES_CONTAINER_5 = idPrefix + 'SCC5';
                
                addElement(SINGLE_SONG_CONTAINER, 'div', SONG_CIRCLES_CONTAINER_1, '');
                addElement(SONG_CIRCLES_CONTAINER_1, 'div', SONG_CIRCLES_CONTAINER_2, '');
                addElement(SONG_CIRCLES_CONTAINER_2, 'div', SONG_CIRCLES_CONTAINER_3, '');
                addElement(SONG_CIRCLES_CONTAINER_3, 'div', SONG_CIRCLES_CONTAINER_4, '');
                addElement(SONG_CIRCLES_CONTAINER_4, 'div', SONG_CIRCLES_CONTAINER_5, '');

                addClassesToCircles(SONG_CIRCLES_CONTAINER_1, SONG_CIRCLES_CONTAINER_2, SONG_CIRCLES_CONTAINER_3, SONG_CIRCLES_CONTAINER_4, song.infocode);
                
                const ICON = idPrefix + 'I';
                addElement(SONG_CIRCLES_CONTAINER_5, 'i', ICON, '');
                $('#'+ICON).addClass('fas fa-music');

                $('#'+SONG_CIRCLES_CONTAINER_1).hover(() => {
                    setTimeout(() => {

                        $('#'+ICON).toggleClass('fas fa-music far fa-play-circle');
                    }, 230)
                    // $('#'+ICON).toggleClass('fas fa-music far fa-file-audio');
                })
                
                const songTitle = song.name.substr(0, song.nameLen);
                let secsFill = '';
                if (song.secs < 10) secsFill = '0';
                const songDuration = song.mins + ':' + secsFill + song.secs;
                
                const SONG_TITLE_LABEL = idPrefix + 'STL';
                const SONG_DURATION_LABEL = idPrefix + 'SDL';
                
                // addElement(SINGLE_SONG_CONTAINER, 'p', SONG_TITLE_LABEL, 'TTT');
                // addElement(SINGLE_SONG_CONTAINER, 'p', SONG_DURATION_LABEL, 'PPP');
                addElement(SINGLE_SONG_CONTAINER, 'p', SONG_TITLE_LABEL, songTitle);
                addElement(SINGLE_SONG_CONTAINER, 'p', SONG_DURATION_LABEL, songDuration);
            }
        })
    }
}

const MAIN_SONG_CONTAINER = 'mainSongContainer';
addSongsToDiv(MAIN_SONG_CONTAINER, sortinfoAuthors);
let CURRENT_SORT_INFOCODE_IDX = 3;

const AUDIO = $('#mainAudio')[0];
const AUDIOSRC = $('#mainAudio source');

let CURRENT_SONG_IDX = 0;

let TIMEOUT_VISUALIZER = setTimeout(() => {}, 0);
function playSong(songIdx) {
    PLAYED_SONG_BOOLEAN = true;
    const song = allSongs[songIdx];
    if (song !== undefined) {
        if ($('#btnPlay').hasClass('fa-play')) {
            $('#btnPlay').toggleClass('fa-play fa-pause');
        }

        const idcode = song.id.length;
        const id = song.id;
        AUDIOSRC.attr('src', song.src);
        AUDIO.load();
        AUDIO.play()
        .then(() => {
            
        })
        .catch(error => {
            console.log(error);
            AUDIO.load();
            AUDIO.play();
        });
        
        CURRENT_SONG_IDX = songIdx;
        
        loadModalSong(song);
        
        loadLyrics(song);
        
        highlightSong(idcode, id);
        
        clearTimeout(TIMEOUT_VISUALIZER);
        TIMEOUT_VISUALIZER = setTimeout(() => {
            visualizeAudio(song.src);
        }, 500);
    }
}

// * Click Song
$('#'+MAIN_SONG_CONTAINER).click(e => {
    const fullid = e.target.id;
    const idcode = fullid[0] - '0';
    if (idcode != 0) {
        const id = fullid.substr(1, idcode);
        
        const songIdx = allSongs.map(e=>e.id).indexOf(id);
        if (allSongs[songIdx] !== undefined) {
            playSong(songIdx);
        }
    }
});

let LAST_HIGHLIGHTED_ID = 'none';
function highlightSong(idcode, id) {
    const prevEl = $('#'+LAST_HIGHLIGHTED_ID);
    if (prevEl.length > 0) prevEl.css('border', 'none');

    const fullId = idcode + id + 'SSC';
    
    $('#'+fullId).css('border', '2px solid black');
    LAST_HIGHLIGHTED_ID = fullId;
}

const lyrics = $('#lyrics');
function loadLyrics(song) {
    if (song.lyrics == 'none') {
        lyrics.html('There are currently no lyrics for this song.');
    }
    else {
        lyrics.html(song.lyrics);
    }
}

function getAuthor(song) {
    let rStr = '';
    const temp = song.infocode[3];
    if (temp == '0') rStr = 'Simon';
    else if (temp == '1') rStr = 'Evgenija';
    else if (temp == '2') rStr = 'Simon and Evgenija';

    return 'by ' + rStr;
}

function updatePositionState() {
    setTimeout(() => {
        navigator.mediaSession.setPositionState({
            duration: AUDIO.duration,
            playbackRate: AUDIO.playbackRate,
            position: AUDIO.currentTime
        });
    }, 100);
}

const modalSong = $('#modalSong');
const modalSongTitle = $('#modalSongTitle');
const modalSongAuthor = $('#modalSongAuthor');
const modalSongImg = $('#modalSongImg');
function loadModalSong(song) {
    if (media.matches) {
        setTimeout(() => {
            modalSong.css('display', 'flex');
        }, 400);
    }
    else {
        modalSong.css('display', 'flex');
    }
    const title = song.name.substr(0, song.nameLen);
    const author = getAuthor(song);
    modalSongTitle.html(title);
    modalSongAuthor.html(author);

    const imgSrc = getModalImgSrc(song);
    modalSongImg.attr('src', imgSrc);

    // notifications display
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: title,
            artist: author,
            album: author,
            artwork: [
                // { src: './images/logo.png',   sizes: '96x96',   type: 'image/png' }
                { src: imgSrc,   sizes: '96x96',   type: 'image/jpg' }
            ]
        });
        updatePositionState();
    }

    navigator.mediaSession.setActionHandler('previoustrack', function() {
        playPreviousSong();
    });

    navigator.mediaSession.setActionHandler('nexttrack', function() {
        playNextSong();
    });

    let skipTime = 10;
    navigator.mediaSession.setActionHandler('seekbackward', function() {
        AUDIO.currentTime = Math.max(AUDIO.currentTime - skipTime, 0);
        updatePositionState();
    });

    navigator.mediaSession.setActionHandler('seekforward', function() {
        AUDIO.currentTime = Math.min(AUDIO.currentTime + skipTime, AUDIO.duration);
        updatePositionState();
    });
}

const modalImages = [
    {src: './images/00a.jpg', infocode: '00'},
    {src: './images/00b.jpg', infocode: '00'},
    {src: './images/00c.jpg', infocode: '00'},
    {src: './images/00d.jpg', infocode: '00'},
    {src: './images/00e.jpg', infocode: '00'},
    {src: './images/00f.jpg', infocode: '00'},
    {src: './images/00g.jpg', infocode: '00'},
    {src: './images/02a.jpg', infocode: '02'},
    {src: './images/02b.jpg', infocode: '02'},
    {src: './images/02c.jpg', infocode: '02'},
    {src: './images/02d.jpg', infocode: '02'},
    {src: './images/02e.jpg', infocode: '02'},
    {src: './images/10a.jpg', infocode: '10'},
    {src: './images/10b.jpg', infocode: '10'},
    {src: './images/11a.jpg', infocode: '11'},
    {src: './images/12a.jpg', infocode: '12'},
    {src: './images/22a.jpg', infocode: '22'},
    {src: './images/22b.jpg', infocode: '22'},
]
let targetModalImages = [];

function getModalImgSrc(song) {
    const targetinfocode = song.infocode.substr(2, 2);
    targetModalImages = [];
    modalImages.forEach(img => {
        if (img.infocode == targetinfocode) {
            targetModalImages.push(img);
        }
    })
    let src = './images/logo.png';
    if (targetModalImages.length > 0) {
        const rnd = Math.floor(getRnd(0, targetModalImages.length));
        src = targetModalImages[rnd].src;
    }
    return src;
}

$('#generalSettingsContainer').click(e => {
    if (e.target.id == 'generalSettingsContainer') modalSong.css('display', 'none');
})

modalSong.click(e => {
    const id = e.target.id;
    if (id == 'modalSong') {
        modalSong.css('display', 'none');
    }
});

    // * infocode:
    //      ic[0] = (0 for original, 1 for cover)
    //      ic[1] = (0 for instrumental, 1 for singing)
    //      ic[2] = (0 for guitar, 1 for piano, 2 for both)
    //      ic[3] = (o for simon, 1 for evgenija, 2 for both)

function getInfocodemaxidx(infocodeidx) {
    if (infocodeidx == 0) return 1; // 0..1
    if (infocodeidx == 1) return 1;
    if (infocodeidx == 2) return 2; // 0..2
    if (infocodeidx == 3) return 2;
}

function playPreviousSong() {
    let songIdx = CURRENT_SONG_IDX;

    // if current sort is: by All
    let newIdx = songIdx-1;
    if (newIdx < 0) newIdx = TOTAL_SONGS-1;
    let newSong = allSongs[newIdx];

    if (CURRENT_SORT_INFOCODE_IDX != -1) {
        // getting the value of the infocode of the song at position current sort idx; and the max value for that particular sorting (3 sorts returns value 2).
        // e.g. song's author is simon, sorting is by authors, CURR_SORT_INF_IDX = 3, infocodeidxval = currSong.infocode[3] = 0.
        let infocodemaxidx = getInfocodemaxidx(CURRENT_SORT_INFOCODE_IDX);
        let infocodeidxval = allSongs[songIdx].infocode[CURRENT_SORT_INFOCODE_IDX];

        // special code for if this is the last song
        let start = songIdx-1;
        if (start < 0) {
            start = TOTAL_SONGS-1;
            infocodeidxval--;
            if (infocodeidxval < 0) infocodeidxval = infocodemaxidx;
        }

        // go to the rest of the songs to find a song from the same sorting info (e.g. author); if not found, start from the beginning and search for the next author.
        for (let i = start; i >= 0; i--) {
            newSong = allSongs[i];
            if (infocodeidxval == newSong.infocode[CURRENT_SORT_INFOCODE_IDX]) {
                newIdx = i;
                break;
            }
            
            if (i == 0) {
                i = TOTAL_SONGS;
                infocodeidxval--;
                if (infocodeidxval < 0) infocodeidxval = infocodemaxidx;
            }
        }
    }

    if (shuffled) {
        let shuffRndNumbersCurrIdx = shuffRndNumbers.indexOf(CURRENT_SONG_IDX);
        shuffRndNumbersCurrIdx--;
        if (shuffRndNumbersCurrIdx < 0) shuffRndNumbersCurrIdx = shuffRndNumbers.length-1;

        newIdx = shuffRndNumbers[shuffRndNumbersCurrIdx];
    }

    playSong(newIdx);
}

function playNextSong() {
    let songIdx = CURRENT_SONG_IDX;

    // if current sort is: by All
    let newIdx = songIdx+1;
    if (newIdx >= TOTAL_SONGS) newIdx = 0;
    let newSong = allSongs[newIdx];

    if (CURRENT_SORT_INFOCODE_IDX != -1) {
        // getting the value of the infocode of the song at position current sort idx; and the max value for that particular sorting (3 sorts returns value 2).
        // e.g. song's author is simon, sorting is by authors, CURR_SORT_INF_IDX = 3, infocodeidxval = currSong.infocode[3] = 0.
        let infocodemaxidx = getInfocodemaxidx(CURRENT_SORT_INFOCODE_IDX);
        let infocodeidxval = allSongs[songIdx].infocode[CURRENT_SORT_INFOCODE_IDX];

        // special code for if this is the last song
        let start = songIdx+1;
        if (start >= TOTAL_SONGS) {
            start = 0;
            infocodeidxval++;
            if (infocodeidxval > infocodemaxidx) infocodeidxval = 0;
        }

        // go to the rest of the songs to find a song from the same sorting info (e.g. author); if not found, start from the beginning and search for the next author.
        for (let i = start; i < TOTAL_SONGS; i++) {
            newSong = allSongs[i];
            if (infocodeidxval == newSong.infocode[CURRENT_SORT_INFOCODE_IDX]) {
                newIdx = i;
                break;
            }
            
            if (i == TOTAL_SONGS-1) {
                i = -1;
                infocodeidxval++;
                if (infocodeidxval > infocodemaxidx) infocodeidxval = 0;
            }
        }
    }

    if (shuffled) {
        let shuffRndNumbersCurrIdx = shuffRndNumbers.indexOf(CURRENT_SONG_IDX);
        shuffRndNumbersCurrIdx++;
        if (shuffRndNumbersCurrIdx >= shuffRndNumbers.length) shuffRndNumbersCurrIdx = 0;

        newIdx = shuffRndNumbers[shuffRndNumbersCurrIdx];
    }

    playSong(newIdx);
}

mainAudio.addEventListener('ended', () => {
    playNextSong();
})

let gradient = 'linear-gradient(to right, #0000 20%, #000f 100%';
let oldPercentageFloat = 0;
mainAudio.ontimeupdate = () => {
    let percentageFloat = parseFloat(mainAudio.currentTime / mainAudio.duration * 100);
    // const samples = 100;
    // let increment = (percentageFloat - oldPercentageFloat) / samples;

    // for (let percentageVal = oldPercentageFloat; percentageVal < percentageFloat; percentageVal += increment) {
        let percentageStr = ' ' + percentageFloat + '%'
        let startColor = '#777';
        let endColor = 'transparent';
        let gradient = 'linear-gradient(to right, ' + startColor + percentageStr + ', ' + endColor + percentageStr + ', ' + endColor + ' 100%)';
        $('#canvas').css('background-image', gradient);
    // }
}

$('#btnSortByAll').click(() => {
    addSongsToDiv(MAIN_SONG_CONTAINER, sortinfoAll);
    CURRENT_SORT_INFOCODE_IDX = -1;
})

$('#btnSortByAuthors').click(() => {
    addSongsToDiv(MAIN_SONG_CONTAINER, sortinfoAuthors);
    CURRENT_SORT_INFOCODE_IDX = 3;
})

$('#btnSortByInstruments').click(() => {
    addSongsToDiv(MAIN_SONG_CONTAINER, sortinfoInstruments);
    CURRENT_SORT_INFOCODE_IDX = 2;
})

$('#btnSortByOriginality').click(() => {
    addSongsToDiv(MAIN_SONG_CONTAINER, sortinfoOriginality);
    CURRENT_SORT_INFOCODE_IDX = 0;
})

$('#btnSortByVocals').click(() => {
    addSongsToDiv(MAIN_SONG_CONTAINER, sortinfoVocals);
    CURRENT_SORT_INFOCODE_IDX = 1;
})

$('#btnPlayback').click(() => {
    const song = allSongs[CURRENT_SONG_IDX];
    loadModalSong(song);
})

let canPrev = true;
$('#btnPrevSong').click(() => {
    if (canPrev) {
        playPreviousSong();
        canPrev = false;
        setTimeout(() => {
            canPrev = true;
        }, 200);
    }
})

let canNext = true;
$('#btnNextSong').click(() => {
    if (canNext) {
        playNextSong();
        canNext = false;
        setTimeout(() => {
            canNext = true;
        }, 200);
    }
})

let shuffled = false;
let shuffRndNumbers = [];
let templateNumbers = [];
$('#btnShuffle').click(() => {
    $('#btnShuffle').toggleClass('active');
    if (shuffled) shuffled = false;
    else {
        shuffled = true;

        shuffRndNumbers = [];
        templateNumbers = [];
        for (let tn = 0; tn < TOTAL_SONGS; tn++) {templateNumbers.push(tn);}

        for (let i = 0; i < TOTAL_SONGS; i++) {
            let rndTemplateIdx = Math.floor(getRnd(0, templateNumbers.length));
            let rndTemplateVal = templateNumbers[rndTemplateIdx];
            templateNumbers.splice(rndTemplateIdx, 1);

            shuffRndNumbers.push(rndTemplateVal);
        }
    }
})

$('#btnRepeat').click(() => {
    $('#btnRepeat').toggleClass('active');
    if (mainAudio.loop) mainAudio.loop = 0;
    else mainAudio.loop = 1;
})

let PLAYED_SONG_BOOLEAN = false;
$('#btnPlay').click(() => {
    $('#btnPlay').toggleClass('fa-play fa-pause');
    if (!PLAYED_SONG_BOOLEAN) playSong(CURRENT_SONG_IDX);
    else if (mainAudio.paused) mainAudio.play();
    else mainAudio.pause();
})

// * Audio Visualiser
$('#canvas').click(e => {
    let canvWidth = 500;
    if (media.matches) canvWidth = 300;

    const el = $('#canvas');
    const xPos = e.pageX - el.offset().left;

    const percentageCanv = xPos * 100 / canvWidth;

    const song = allSongs[CURRENT_SONG_IDX];
    const duration = song.mins*60+song.secs;

    const newSongTime = percentageCanv / 100 * duration;

    mainAudio.currentTime = newSongTime;
})

window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
let currentBuffer = null;

function visualizeAudio(url) {
    fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => draw(normalizeData(filterData(audioBuffer))));
}

socket.on('visualizeAudio', normalizedData => {
    console.log(normalizedData);
});

function filterData(audioBuffer) {
    const rawData = audioBuffer.getChannelData(0);
    const samples = 100;
    const blockSize = Math.floor(rawData.length / samples);
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
        let blockStart = blockSize * i;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
            sum = sum + Math.abs(rawData[blockStart+j]);
        }
        filteredData.push(sum / blockSize);
    }
    return filteredData;
}

function normalizeData(filteredData) {
    const multiplier = Math.pow(Math.max(...filteredData), -1);
    return filteredData.map(n => n*multiplier);
}

function draw(normalizedData) {
    const canvas = document.querySelector('canvas');
    const dpr = window.devicePixelRatio || 1;
    const padding = 20;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.translate(0, canvas.offsetHeight / 2 + padding);

    const width = canvas.offsetWidth / normalizedData.length;
    for (let i = 0; i < normalizedData.length; i++) {
        const x = width * i;
        let height = normalizedData[i] * canvas.offsetHeight - padding;
        if (height < 0) height = 0;
        else if (height > canvas.offsetHeight / 2) height = canvas.offsetHeight / 2;

        drawLineSegment(ctx, x, height, width, (i*1)%2);
    }
}

function drawLineSegment(ctx, x, y, width, isEven) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    y = isEven ? y : -y;

    ctx.moveTo(x, 0);
    ctx.lineTo(x, y);
    ctx.arc(x+width/2, y, width/2, Math.PI, 0, isEven);
    ctx.lineTo(x+width, 0);
    ctx.stroke();
}