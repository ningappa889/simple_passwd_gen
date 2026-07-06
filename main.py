import random
import string
print("=== Password Generator ===")
length = int(input("Enter password length: "))
characters = (
    string.ascii_lowercase +
    string.ascii_uppercase +
    string.digits +
    string.punctuation
)
password = ""
for i in range(length):
    password += random.choice(characters)
print("\nGenerated Password:")
print(password)