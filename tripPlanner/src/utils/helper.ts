import  firestore  from '@react-native-firebase/firestore';

const db = firestore();

function formatDate(inputDate:Date) {
    const date = new Date(inputDate);
    
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();
    
    // Ensure that day and month are formatted with leading zeros if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    
    // Create the formatted date string in the desired format
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    
    return formattedDate;
  }

  async function generateUniqueTripID() {
    let isUnique = false;
    let uniqueID;
  
    while (!isUnique) {
      uniqueID = `${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`;
      
      const tripDoc = await db.collection("trips").doc(uniqueID).get();
      
      if (!tripDoc.exists) {
        isUnique = true;
      }
    }
  
    return uniqueID;
  }

  async function generateUniqueTaskID(userUID: string, tripID: string): Promise<string> {
    let isUnique = false;
    let uniqueID: any;
  
    while (!isUnique) {
      uniqueID = `${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`;
  
      const taskRef = db.collection("users").doc(userUID)
        .collection("trips").doc(tripID)
        .collection("tasks").doc(uniqueID);
  
      const taskDoc = await taskRef.get();
  
      if (!taskDoc.exists) {
        isUnique = true;
      }
    }
  
    return uniqueID;
  }
  
  

  

  export {formatDate,generateUniqueTripID,generateUniqueTaskID}