def preprocess_input(report):

    return f"{report.title} {report.description} {report.module} {report.frequency} {report.user_type} {report.logs}"
