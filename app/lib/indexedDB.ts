
const DB_NAME = "quizDB";
const STORE_NAME = "quizResults";

export const openDB = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 2); // Ensure correct DB name

        request.onupgradeneeded = (event) => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const saveQuizResult = async (score: number, totalQuestions: number) => {
  return new Promise<void>((resolve, reject) => {
    const request = indexedDB.open("quizDB", 2); // Ensure the latest version

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("quizResults")) {
        db.createObjectStore("quizResults", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("quizResults")) {
        reject(new Error("Object store 'quizResults' not found"));
        return;
      }

      const transaction = db.transaction("quizResults", "readwrite");
      const store = transaction.objectStore("quizResults");

      // Save each attempt as a unique entry
      store.add({
        score,
        totalQuestions,
        timestamp: new Date().toISOString(),
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    };

    request.onerror = () => reject(request.error);
  });
};

export const getQuizHistory = async () => {
  try {
    const db = await openDB();

    if (!db.objectStoreNames.contains("quizResults")) {
      console.error("❌ Object store 'quizResults' does not exist.");
      return [];
    }

    const tx = db.transaction("quizResults", "readonly");
    const store = tx.objectStore("quizResults");

    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => {
        console.log("✅ Retrieved quiz history:", request.result);
        resolve(request.result);
      };

      request.onerror = () => {
        console.error("❌ Error retrieving quiz history:", request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("❌ Error fetching quiz history:", error);
    return [];
  }
};
