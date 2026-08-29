import os
import sys

from dotenv import load_dotenv
from google import genai
from google.genai import types


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    load_dotenv()

    # Support the key name already used in this project's .env file, while
    # also accepting the conventional GEMINI_API_KEY environment variable.
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("gemini_api_key")
    if not api_key:
        raise RuntimeError(
            "Set GEMINI_API_KEY in the environment or add it to a .env file."
        )

    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents="Explain how AI works in a few words.",
        config=types.GenerateContentConfig(
            automatic_function_calling=types.AutomaticFunctionCallingConfig(
                disable=True
            )
        ),
    )

    if not response.text:
        raise RuntimeError("Gemini returned no text. Check the API response and key.")

    print(response.text)


if __name__ == "__main__":
    main()
