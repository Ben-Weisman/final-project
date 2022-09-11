FROM python:3.8


# Working dir
WORKDIR /usr/src/app

# Copy all source files
COPY . .

# Install Dependencies
RUN pip install -r requirements.txt

ENTRYPOINT ["python"]


CMD ["scraper.py"]


# Expose the API port
EXPOSE 5000