"""
Generate a secure random secret key for the .env file.

Usage:
    python scripts/generate_secret.py
"""
import secrets


def main() -> None:
    print("Copy this value into SECRET_KEY in your .env:")
    print()
    print(secrets.token_hex(32))


if __name__ == "__main__":
    main()

