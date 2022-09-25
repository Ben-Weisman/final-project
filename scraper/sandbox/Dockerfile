# syntax=docker/dockerfile:1

FROM python:3.8

WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python", "-m" , "flask", "run", "--host=0.0.0.0"]






# FROM python:3.8


# # Working dir
# WORKDIR /usr/src/app

# # Copy all source files
# COPY . .

# # Install Dependencies
# RUN pip install -r requirements.txt

# ENTRYPOINT ["python"]


# CMD ["scraper.py"]


# Expose the API port
# EXPOSE 5000