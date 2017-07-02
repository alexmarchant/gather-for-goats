const functions = require('firebase-functions');
const admin = require('firebase-admin');
const scrapeIt = require('scrape-it');

// Setup admin to be able to do database stuff
admin.initializeApp(functions.config().firebase);

// Scrape the donations page and update the database
exports.scrapeDonations = functions.https.onRequest((request, response) => {
  scrapeIt('https://donorbox.org/goats-for-syrian-bedouin-refugees-in-jordan-1', {
    donations: '.description > div:first-child > p.bold',
  }).then(page => {
    // Parse response
    let cleanedDonations = page.donations.replace('$', '');
    cleanedDonations = cleanedDonations.replace(',', '');
    const goatsPurchased = Math.floor(cleanedDonations / 300)
    const adjustedGoatsPurchased = goatsPurchased + 200;
    console.log({cleanedDonations: cleanedDonations, goatsPurchased: adjustedGoatsPurchased});

    // Update database
    admin.database().ref('/goatsPurchased').set(adjustedGoatsPurchased)
      .then(snapshot => {
        console.log('Saved to db');
        response.send(`🐐...${adjustedGoatsPurchased}`);
      }).catch(err => {
        console.error(err);
        response.end();
      });
  }).catch(err => {
    console.error(err);
    response.end();
  });
});
