FROM python:3.10-alpine AS runner
WORKDIR /app
ENV PYTHONUNBUFFERED=1
ENV PORT=3000

COPY . /app
EXPOSE 3000

CMD ["python", "server.py"]
