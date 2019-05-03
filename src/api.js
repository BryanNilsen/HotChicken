const baseUrl = "http://localhost:3000/chicken";

const API = {
  getChickens: function() {
    return fetch(baseUrl).then(results => results.json());
  },
  getOneChicken: function(chickenId) {
    return fetch(`${baseUrl}/${chickenId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  },
  saveChicken: function(chickenObject) {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(chickenObject)
    }).then(response => response.json());
  },
  deleteChicken: function(chickenId) {
    return fetch(`${baseUrl}/${chickenId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  },
  editChicken: function(chickenId, chickenObject) {
    return fetch(`${baseUrl}/${chickenId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(chickenObject)
    }).then(response => response.json());
  }
};
