from __builtin__ import file

#fexport = open('/home/nicholas/Scaricati/5_export.csv', 'r')
fdataset = open('/home/nicholas/Documenti/Dataset_FraudDetection/12cyclic_sameCF.csv', 'r')

#export = fexport.read().split('\n')
dataset = fdataset.read().split('\n')
i = 0

file = open('/home/nicholas/Documenti/Dataset_FraudDetection/12cyclic_sameCF_u.csv','w')
#for row1 in export :
for row in dataset :
    i += 1
    print (row + ',user')
    file.write(row + ',user\n')
print (i)
'''
for row1 in export :
    if not row1 in dataset :
        print (row1)
        i += 1
print (i)
'''

file.close()
#fexport.close()
fdataset.close()