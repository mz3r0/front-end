import json
from typing import List
json_name = 'ephraimduncan-awesome-developer-dictionary.json'


def load_and_split(name: str) -> List:
    with open(name, encoding='utf-8') as fin:
        whole_file_str = ''.join(fin.readlines())
        result = whole_file_str.split('## ')[4:]
        return result


if __name__ == "__main__":
    data = dict()
    data['sections'] = []

    f = load_and_split('adapted.md')

    for section in f:
        sp = section.split("- ")

        s = dict()

        s['letter'] = sp[0].strip()
        s['content'] = []

        # Term example:
        # - **array**: a data structure

        for i in range(1, len(sp)):
            sp2 = sp[i].split("**")
            if len(sp2) != 3:
                print("for {} index is {}".format(section[:2], i))
                continue

            term_name = sp2[1]
            term_definition = sp2[2]
            s['content'].append((term_name, term_definition))

        data['sections'].append(s)

    # Save the data as JSON

    with open(json_name, 'w') as fout:
        json.dump(data, fout, indent=4)
