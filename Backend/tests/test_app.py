import unittest
from unittest.mock import patch, MagicMock
from app import app

class FlaskTestCase(unittest.TestCase):

    def setUp(self):
        """Set up the test client before each test"""
        app.config["TESTING"] = True
        self.client = app.test_client()

    @patch("app.db")  
    def test_add_task(self, mock_db):
        
        mock_collection = MagicMock()
        mock_db.collection.return_value = mock_collection
        mock_collection.add.return_value = (None, MagicMock(id="mock_task_id"))
        response = self.client.post("/tasks", json={"content": "New Task"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json["message"], "task added")
        self.assertEqual(response.json["id"], "mock_task_id")
        
    
    @patch("app.db")
    def test_get_task(self, mock_db):
        mock_task1=MagicMock()
        mock_task1.id="task1"
        mock_task1.to_dict.return_value={"content":"task one", "done":False}

        mock_task2=MagicMock()
        mock_task2.id="task2"
        mock_task2.to_dict.return_value={"content":"task two", "done":True}

        mock_db.collection.return_value.stream.return_value=[mock_task1, mock_task2]

        response=self.client.get("/tasks")

        self.assertEqual(response.status_code, 200)

        self.assertEqual(response.json,[
            {"id":"task1", "content":"task one", "done":False},
            {"id":"task2", "content":"task two", "done":True}
        ])

    @patch("app.db")
    def test_update_task(self, mock_db):
        mock_doc=MagicMock()
        mock_db.collection.return_value.document.return_value=mock_doc

        update_data={"content":"this is task", "done":True}

        response=self.client.put("/tasks/task123", json=update_data)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"message":"Task updated"})

    @patch("app.db")
    def test_delete_task(self, mock_db):
        mock_doc=MagicMock()
        mock_db.collection.return_value.document.return_value=mock_doc


        response=self.client.delete("/tasks/task123")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"message":"task was deleted"})

if __name__ == "__main__":
    unittest.main()
