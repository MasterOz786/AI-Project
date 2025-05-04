# from transformers import pipeline

# # Load sentiment model explicitly
# sentiment = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment")

# # Input from user
# text = input("Enter text to analyze sentiment: ")

# # Analyze
# result = sentiment(text)[0]

# # Label mapping (because this model returns labels as 'LABEL_0', etc.)
# label_map = {
#     "LABEL_0": "Negative 😠",
#     "LABEL_1": "Neutral 😐",
#     "LABEL_2": "Positive 😊"
# }

# # Output
# print("\nSentiment Analysis Result:")
# print(f"Label     : {label_map[result['label']]}")
# print(f"Confidence: {result['score'] * 100:.2f}%")




from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# Load the tokenizer and model explicitly
model_name = "cardiffnlp/twitter-roberta-base-sentiment"

# Load model and tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Create the pipeline
sentiment_pipeline = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

# Label mapping
label_map = {
    "LABEL_0": "Negative 😠",
    "LABEL_1": "Neutral 😐",
    "LABEL_2": "Positive 😊"
}

def analyze_sentiment(text):
    """Analyze sentiment of the given text and return readable result."""
    try:
        result = sentiment_pipeline(text)[0]
        label = label_map.get(result['label'], result['label'])
        score = result['score'] * 100
        print("\nSentiment Analysis Result:")
        print(f"Text      : {text}")
        print(f"Label     : {label}")
        print(f"Confidence: {score:.2f}%\n")
    except Exception as e:
        print(f"Error analyzing sentiment: {e}")

# Run sentiment analysis interactively
if __name__ == "__main__":
    print("Twitter-RoBERTa Sentiment Analyzer (Type 'exit' to quit)")
    while True:
        text = input("\nEnter text to analyze sentiment: ").strip()
        if text.lower() == "exit":
            print("Goodbye! 👋")
            break
        elif not text:
            print("Please enter a valid sentence.")
        else:
            analyze_sentiment(text)
