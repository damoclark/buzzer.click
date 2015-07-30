#!/usr/bin/env perl

#usage:
# ls -1 | generate-json.pl
print "{\n" ;
while (<STDIN>)
{
	chomp ;
	if (m/^([^\.]+)(\.js)$/)
	{
		print "\t" . $1 ;
		print ": require('" ;
		print './message/' ;
		print $_ ;
		print "'),\n" ;
	}
	
}
print "} ;\n" ;
