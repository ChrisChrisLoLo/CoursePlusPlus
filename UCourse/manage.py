#!/usr/bin/env python
import os
import sys
from pathlib import Path
from dotenv import load_dotenv


if __name__ == '__main__':
    env_path = Path('./UCourse') / '.env'

    load_dotenv(dotenv_path=env_path)
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'UCourse.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)
