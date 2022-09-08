<script setup lang="ts">

</script>

<template>
  <main>
    <input type="text" class="searchbar" placeholder="Search..." v-model="searchbarInput" @keyup="Search()"><!--<button @click="Search()" class="search-button">Search</button>-->
    <div class="filters"><input type="checkbox" @click="HideNonNativeLanguages()">Only show native languages<!--<input type="checkbox">Only show advanced or higher<input type="checkbox">Only show intermediate or higher--><input type="checkbox" @click="OnlyShowPositiveScores()">Only show positive scores</div>
    <table class="table" id="table">
      <tr>
        <th @click="SortByName()">
          Name
        </th>
        <th @click="SortByScore()">
          Score
        </th>
        <th>
          Native language(s)
        </th>
        <th>
          <span v-if="hideNonNativeLanguages === false">Currently learning/also knows</span>
        </th>
      </tr>
      <tr v-for="user in store.users" class="table-row">
        <td v-if="user.score >0 || onlyShowPositiveScores === false"> 
          <button @click="DeleteUser(user)">🗑️</button>{{user.name}} <!--NAMN-->
        </td>
        <td v-if="user.score >0 || onlyShowPositiveScores === false">
          {{user.score}} <!--POÄNG-->
          <span>
            <button @click="user.score++">
              +
            </button>
            <button @click="user.score--">
              -
            </button>
          </span>
        </td>
        <td>
          <span v-if="user.score >0 || onlyShowPositiveScores === false" v-for="language in user.languages.filter((language: any) => language.level === 'Native')"> <!--MODERSMÅL-->
            {{language.name}}
          </span>
        </td>
        <td>
          <span v-if="user.score >0 || onlyShowPositiveScores === false" v-for="language in user.languages.filter((language: any) => language.level !== 'Native')"> <!--ANDRA SPRÅK-->
            <span @click="user.languages.splice(user.languages.indexOf(language), 1)" v-if="hideNonNativeLanguages === false">{{language.name}} ({{language.level}})</span>
          </span>
        </td>
        <span v-if="user.score >0 || onlyShowPositiveScores === false">
          <button @click="user.languages.pop()">🗑️</button>
          <button @click="AddNewLanguage(user)">+</button>
        </span>
      </tr>
    </table>
    <p>NEW USER</p>
    <button @click="AddNewUser()" class="new-user-button">+</button><input type="text" placeholder="Your name" v-model="newUsername" class="new-user"><input type="text" placeholder="Your native language, if you have multiple, seperate them by commas like this: »English, French«" v-model="newNativeLanguages" class="new-user">
    <p>ADD NEW LANGUAGE TO USER</p>
          <input type="text" v-model="newLanguageName" class="new-user-language" placeholder="Your language">
          <select v-model="newLanguageLevel" class="new-user-language">
            <option>Native</option>
            <option>Proficient</option>
            <option>Advanced</option>
            <option>Upper Intermediate</option>
            <option>Intermediate</option>
            <option>Pre-Intermediate</option>
            <option>Beginner</option>
          </select>
  </main>
</template>

<script lang="ts">
  import { store } from "../store/store.js";
  import { defineComponent } from "vue";

  export default defineComponent({
    props: {
      
    },
    data() { //VARIABLER
      return {
        store, //DENNA VARIABEL INNEHÅLLER USERS FRÅN JAVASCRIPTFILEN
        copyOfusers: [...store.users], //KOPIA AV USERS
        searchbarInput: ``, //VAD STÅR DET I TEXTRUTAN?
        sortedByName: false, sortedbyScore: false,
        reverseSortedByName: false, reverseSortedByScore: false,
        hideNonNativeLanguages: false, //GÖMMA ALLA SPRÅK SOM INTE ÄR MODERSMÅL
        onlyShowPositiveScores: false, //GÖMMA ALLA MED NEGATIVT SCORE
        newUsername: ``,
        newNativeLanguages: ``,
        newLanguageName: ``,
        newLanguageLevel: ``,
        JSONString: JSON.stringify(store.users)
      }
    },
    mounted() {

    },
    methods: { //METODER
      Search() { //SÖKMETODEN
        console.log(this.JSONString);
        let filter: string = this.searchbarInput.toLocaleUpperCase();
        console.log(filter);

        let table: any = document.getElementById("table");
        let tr = document.getElementsByTagName("tr"); //TR ÄR EN ARRAY
        for (let i: number = 1; i < tr.length; i++) {
          for (let j: number = 0; j < 4; j++) {
            let td: any = tr[i].getElementsByTagName("td")[j];
            let txtValue: string = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }
        }
      },

      SortByName() {
        if (this.sortedByName === false) { //IF !SORTED => SORT
          this.copyOfusers = [...store.users];
          this.store.users.sort((a: any, b: any) => a.name.localeCompare(b.name))
          this.sortedByName = true;
          this.sortedbyScore = this.reverseSortedByScore = false;
        }

        else if (this.sortedByName === true && this.reverseSortedByName === false) { // ELSE IF SORTED && !REVERSED => REVERSE
          this.store.users.sort((a: any, b: any) => b.name.localeCompare(a.name))
          this.reverseSortedByName = true;
          this.sortedbyScore = this.reverseSortedByScore = false;
        }

        else { //ELSE (SORTED && REVERSED)
          this.store.users = [...this.copyOfusers]
          this.sortedByName = this.reverseSortedByName = false;
          this.sortedbyScore = this.reverseSortedByScore = false;
        }
      },

      SortByScore() {
        if (this.sortedbyScore === false) { //IF !SORTED => SORT
          this.copyOfusers = [...store.users];
          this.store.users.sort((a: any, b: any) => b.score - a.score)
          this.sortedbyScore = true;
          this.sortedByName = this.reverseSortedByName = false;
        }

        else if (this.sortedbyScore === true && this.reverseSortedByScore === false) { // ELSE IF SORTED && !REVERSED => REVERSE
          this.store.users.sort((a: any, b: any) => a.score - b.score)
          this.reverseSortedByScore = true;
          this.sortedByName = this.reverseSortedByName = false;
        }

        else { //ELSE (SORTED && REVERSED)
          this.store.users = [...this.copyOfusers]
          this.sortedbyScore = this.reverseSortedByScore = false;
          this.sortedByName = this.reverseSortedByName = false;
        }
      },

      HideNonNativeLanguages() {
        if (this.hideNonNativeLanguages === false) {
          this.hideNonNativeLanguages = true;
        }

        else {
          this.hideNonNativeLanguages = false;
        }
      },

      OnlyShowPositiveScores() {
        if (this.onlyShowPositiveScores === false) {
          this.onlyShowPositiveScores = true;
        }

        else {
          this.onlyShowPositiveScores = false;
        }
      },

      AddNewUser() {
        let nativeLanguageArray: string[] = this.newNativeLanguages.split(`, `);

        if ((this.newUsername === `` || null) || (this.newNativeLanguages === ``|| null)) {
          alert(`ERROR! NO USERNAME, OR LANGUAGE ASSIGNED`);
          location.reload();
        }

        else {
          this.store.users.push({
            name: this.newUsername,
            score: 1,
            languages: [

            ]
          })
        }

        for (let i: number = 0; i < nativeLanguageArray.length; i++) {
          this.store.users[this.store.users.length - 1].languages.push({
            name: nativeLanguageArray[i],
            level: `Native`
          })
        }
      },

      AddNewLanguage(user: any) {
        if ((this.newLanguageName === `` || null) || (this.newLanguageLevel === ``|| null)) {
          alert(`ERROR! NO LANGUAGE, OR LEVEL ASSIGNED`);
          location.reload();
        }

        else {
          user.languages.push({
            name: this.newLanguageName,
            level: this.newLanguageLevel
          })
        }
      },

      DeleteUser(user: any) {
        store.users.splice(store.users.indexOf(user), 1);
      }
    },
    computed: {

    }
  })
</script>

<style>
  .table {
    width: 100%;
  }

  .searchbar {
    width: 100%;
    min-height: 7vh;
  }

  .search-button {
    width: 10%;
  }

  .new-user-button {
    width: 2vw;
    height: 4vh;
  }

  .new-user {
    width: 49vw;
    height: 4vh;
  }

  .new-user-language {
    width: 50vw;
    height: 4vh;
  }
</style>