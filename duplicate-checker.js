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

  //   console.log(`
  //   firstName: ${firstName},
  //   lastName: ${lastName},
  //   address: ${address},
  //   email: ${email},
  //   phone: ${phone},
  //   ipAddress: ${ipAddress},
  //   paypalName: ${paypalName}
  //   `);

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

  displayResults(checkDuplicatesInList(profileList));
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

    checkListDuplicates(rowDataList, profileList);

    console.log('listOfDuplicates', listOfDuplicates);

    displayResults(listOfDuplicates);
  };
  // start reading the file. When it is done, calls the onload event defined above.
  reader.readAsBinaryString(csvFile.files[0]);
}

function displayResults(listOfDuplicates) {
  let resultBoard = document.getElementById('resultBoard');

  if (listOfDuplicates.length) {
    resultBoard.innerText =
      listOfDuplicates.length + ' duplicate records detected';
  } else {
    resultBoard.innerText = 'There are no duplicate records';
  }
}

function checkListDuplicates(list1, list2) {
  return list1.filter(function (list1Item) {
    return checkDuplicatesInList(list1Item, list2);
  });
}

function checkDuplicatesInList(list) {
  let isDuplicate = false;
  let strippedList = list.map(function (profileData, index) {
    return {
      address: profileData.address,
      email: profileData.email,
      phone: profileData.phone,
      ipAddress: profileData.ipAddress,
      paypalName: profileData.paypalName,
    };
  });

  profileList = strippedList.filter(function (profileData, index) {
    isDuplicate = strippedList.indexOf(profileData) != index;

    if (isDuplicate) {
      //
    }

    return strippedList;
  });

  return profileList;
}

function isStringDuplicate(str1, str2) {
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
