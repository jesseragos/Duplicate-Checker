let profileList = [
  {
    firstName: 'Anthony',
    lastName: 'Berns',
    email: 'anthony@berns.com',
    address: '186 Walkers Ridge Way, Lombard, Illinois, USA',
    phone: '520-301-1707',
    ipAddress: '168.57.90.113',
    paypalName: 'anthonyberns454',
  },
  {
    firstName: 'John',
    lastName: 'Hamm',
    email: 'john@hamm.com',
    address: '4318 Nutter Street, Saint Joseph, Missouri, USA',
    phone: '816-236-4703',
    ipAddress: '82.223.51.82',
    paypalName: 'johnhamm47',
  },
];

function inputRecord() {
  let firstName = document.getElementById('firstName').value;
  let lastName = document.getElementById('lastName').value;
  let address = document.getElementById('address').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let ipAddress = document.getElementById('ipAddress').value;
  let paypalName = document.getElementById('paypalName').value;

  let profileInput = {
    firstName,
    lastName,
    email,
    address,
    phone,
    ipAddress,
    paypalName,
  };

  profileList.push(profileInput);

  displayResults(checkDuplicatesInList());
}

function uploadCsv() {
  let csvFile = document.getElementById('uploadCSV');
  let rowDataList = [];
  var reader = new FileReader();

  reader.onload = function () {
    let rawRowData = reader.result.split('\n');

    rawRowData.map(function (rowData) {
      let rowColData = rowData.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

      if (rowColData && rowColData.length > 1) {
        rowDataList.push(rowColData);
      }
    });

    profileList = profileList.concat(rowDataList);

    displayResults(checkDuplicatesInList());
  };
  // start reading the file. When it is done, calls the onload event defined above.
  reader.readAsBinaryString(csvFile.files[0]);
}

function displayResults(listOfDuplicates) {
  let resultBoard = document.getElementById('resultBoard');
  console.log('listOfDuplicates', listOfDuplicates);
  if (listOfDuplicates.length) {
    resultBoard.innerText = `${
      listOfDuplicates.length
    } duplicate records detected
    ${listOfDuplicates.map((profile) => {
      return `${profile.firstName} ${profile.lastName}`;
    })}`;
  } else {
    resultBoard.innerText = 'There are no duplicate records';
  }
}

function checkDuplicatesInList() {
  let listOfDuplicates = [],
    profile1,
    profile2;

  for (let i = 0; i < profileList.length; i++) {
    for (let j = i + 1; j < profileList.length; j++) {
      profile1 = profileList[i];
      profile2 = profileList[j];

      if (
        isStringDuplicate(profile1.address, profile2.address) ||
        isStringDuplicate(profile1.email, profile2.email) ||
        isStringDuplicate(profile1.phone, profile2.phone) ||
        isStringDuplicate(profile1.ipAddress, profile2.ipAddress) ||
        isStringDuplicate(profile1.paypalName, profile2.paypalName)
      ) {
        listOfDuplicates.push(profileList.splice(i, 1)[0]);
      }
    }
  }

  return listOfDuplicates;
}

function isStringDuplicate(str1, str2) {
  console.log('str1', str1);
  console.log('str2', str2);
  if (normalizeString(str1).localeCompare(normalizeString(str2)) == 0)
    return true;

  return false;
}

function normalizeString(str) {
  return str.trim().toLocaleLowerCase();
}

function logRecords() {
  profileList.map(function (profile) {
    console.log(`
    firstName: ${profile.firstName},
    lastName: ${profile.lastName},
    address: ${profile.address},
    email: ${profile.email},
    phone: ${profile.phone},
    ipAddress: ${profile.ipAddress},
    paypalName: ${profile.paypalName}
    `);
  });
}
